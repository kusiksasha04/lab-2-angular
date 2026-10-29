import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Каталог товарів</h1>
    <p class="muted">Лабораторна робота №3 — Angular (standalone компоненти, signals, Reactive Forms, HttpClient).</p>
    <a routerLink="/products" class="btn">Перейти до товарів →</a>
  `,
})
export class HomeComponent {}
