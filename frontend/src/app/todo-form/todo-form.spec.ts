import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { TodoForm } from './todo-form';
import { TodoService } from '../todo.service';

describe('TodoForm', () => {
  function setup(id: string | null) {
    const service = jasmine.createSpyObj<TodoService>('TodoService', ['get', 'create', 'update']);
    service.get.and.returnValue(of({ id: '1', title: 'old', done: false }));
    service.create.and.returnValue(of({ id: '2', title: 'new', done: false }));
    service.update.and.returnValue(of({ id: '1', title: 'old', done: false }));
    TestBed.configureTestingModule({
      imports: [TodoForm],
      providers: [
        provideRouter([]),
        { provide: TodoService, useValue: service },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map(id ? [['id', id]] : []) } } }
      ]
    });
    const fixture = TestBed.createComponent(TodoForm);
    spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
    fixture.detectChanges();
    return { fixture, service };
  }

  it('creates a todo', () => {
    const { fixture, service } = setup(null);
    fixture.componentInstance.todo.set({ title: 'new', done: false });
    fixture.componentInstance.save();
    expect(service.create).toHaveBeenCalled();
  });

  it('updates an existing todo', () => {
    const { fixture, service } = setup('1');
    expect(fixture.componentInstance.isEdit).toBeTrue();
    fixture.componentInstance.save();
    expect(service.update).toHaveBeenCalledWith('1', jasmine.objectContaining({ title: 'old' }));
  });
});
