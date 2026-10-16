import { Routes } from '@angular/router';
import { TodoList } from './todo-list/todo-list';
import { TodoDetail } from './todo-detail/todo-detail';
import { TodoForm } from './todo-form/todo-form';

export const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: 'todos', component: TodoList },
  { path: 'todos/new', component: TodoForm },
  { path: 'todos/:id', component: TodoDetail },
  { path: 'todos/:id/edit', component: TodoForm },
  { path: '**', redirectTo: 'todos' }
];
