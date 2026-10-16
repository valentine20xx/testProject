import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { confirm } from '../confirm-dialog/confirm-dialog';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  imports: [RouterLink, MatCardModule, MatListModule, MatCheckboxModule, MatButtonModule, MatIconModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList implements OnInit {
  private readonly service = inject(TodoService);
  private readonly dialog = inject(MatDialog);
  readonly todos = signal<Todo[]>([]);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.list().subscribe({
      next: todos => this.todos.set(todos),
      error: () => this.error.set('Could not load todos.')
    });
  }

  toggle(todo: Todo): void {
    this.service.update(todo.id!, { ...todo, done: !todo.done }).subscribe(() => this.load());
  }

  remove(todo: Todo): void {
    confirm(this.dialog, {
      title: 'Delete todo',
      message: `Delete "${todo.title}"? This cannot be undone.`,
      confirmLabel: 'Delete'
    }).subscribe(() => this.service.delete(todo.id!).subscribe(() => this.load()));
  }
}
