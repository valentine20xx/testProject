import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { TodoDetail } from './todo-detail';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';

describe('TodoDetail', () => {
  it('shows the loaded todo', async () => {
    const service = jasmine.createSpyObj<TodoService>('TodoService', ['get', 'delete']);
    service.get.and.returnValue(of({ id: '1', title: 'Buy milk', description: '2 liters', done: true }));
    await TestBed.configureTestingModule({
      imports: [TodoDetail],
      providers: [
        provideRouter([]),
        { provide: TodoService, useValue: service },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map([['id', '1']]) } } }
      ]
    }).compileComponents();
    const fixture = TestBed.createComponent(TodoDetail);
    await fixture.whenStable();
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Buy milk');
    expect(text).toContain('done');
  });
});
