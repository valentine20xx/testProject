import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <a class="title" routerLink="/todos">Todos</a>
      <span class="spacer"></span>
      <a matButton="filled" routerLink="/todos/new"><mat-icon>add</mat-icon>New todo</a>
    </mat-toolbar>
    <main><router-outlet /></main>
  `,
  styles: `
    .title { text-decoration: none; color: inherit; font: var(--mat-sys-title-large); }
    .spacer { flex: 1; }
    main { padding: 1rem; max-width: 50rem; margin: 0 auto; }
  `
})
export class App {}
