import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { confirm } from '../confirm-dialog/confirm-dialog';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-detail',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './todo-detail.html'
})
export class TodoDetail implements OnInit {
  private readonly service = inject(TodoService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  readonly todo = signal<Todo | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.service.get(id).subscribe({
      next: todo => this.todo.set(todo),
      error: () => this.router.navigate(['/todos'])
    });
  }

  remove(): void {
    const todo = this.todo()!;
    confirm(this.dialog, {
      title: 'Delete todo',
      message: `Delete "${todo.title}"? This cannot be undone.`,
      confirmLabel: 'Delete'
    }).subscribe(() => this.service.delete(todo.id!).subscribe(() => this.router.navigate(['/todos'])));
  }
}
