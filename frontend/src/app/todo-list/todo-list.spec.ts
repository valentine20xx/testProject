import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { TodoList } from './todo-list';
import { TodoService } from '../todo.service';

describe('TodoList', () => {
  const service = jasmine.createSpyObj<TodoService>('TodoService', ['list', 'update', 'delete']);

  beforeEach(async () => {
    service.list.calls.reset();
    service.list.and.returnValue(of([{ id: '1', title: 'Buy milk', done: false }]));
    service.delete.and.returnValue(of(undefined));
    await TestBed.configureTestingModule({
      imports: [TodoList],
      providers: [provideRouter([]), { provide: TodoService, useValue: service }]
    }).compileComponents();
  });

  it('renders todos from the service', async () => {
    const fixture = TestBed.createComponent(TodoList);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Buy milk');
  });

  it('deletes a todo and reloads after confirmation', async () => {
    const fixture = TestBed.createComponent(TodoList);
    await fixture.whenStable();
    spyOn(TestBed.inject(MatDialog), 'open').and.returnValue({ afterClosed: () => of(true) } as any);
    fixture.componentInstance.remove({ id: '1', title: 'Buy milk', done: false });
    expect(service.delete).toHaveBeenCalledWith('1');
    expect(service.list).toHaveBeenCalledTimes(2);
  });

  it('does not delete when the confirmation is cancelled', async () => {
    const fixture = TestBed.createComponent(TodoList);
    await fixture.whenStable();
    service.delete.calls.reset();
    spyOn(TestBed.inject(MatDialog), 'open').and.returnValue({ afterClosed: () => of(undefined) } as any);
    fixture.componentInstance.remove({ id: '1', title: 'Buy milk', done: false });
    expect(service.delete).not.toHaveBeenCalled();
  });
});
