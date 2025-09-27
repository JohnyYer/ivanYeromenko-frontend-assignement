import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <header class="header">
      <h1>
        <img src="ivan-yeromenko-logo.png" alt="ivan-yeromenko logo" />
      </h1>
      <nav>
        <a routerLink="/">Home</a>
        <a routerLink="/clients">Clients</a>
      </nav>
    </header>
    <router-outlet />
  `,
  standalone: false,
  styles: [],
})
export class AppComponent {}
