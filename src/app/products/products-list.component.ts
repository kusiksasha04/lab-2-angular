import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product, ProductsService } from './products.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Products</h2>

    <div class="toolbar">
      <select #select (change)="setCategory(select.value)">
        <option value="">All categories</option>
        @for (c of categories(); track c) {
          <option [value]="c">{{ c }}</option>
        }
      </select>
      <a routerLink="/products/new" class="btn">+ Add product</a>
    </div>

    <table>
      <thead>
        <tr><th>Title</th><th>Category</th><th>Price</th><th></th></tr>
      </thead>
      <tbody>
        @for (p of pagedProducts(); track p.id) {
          <tr>
            <td><a [routerLink]="['/products', p.id]">{{ p.title }}</a></td>
            <td><span class="badge">{{ p.category }}</span></td>
            <td>{{ p.price }} ₴</td>
            <td class="actions">
              <a [routerLink]="['/products', p.id, 'edit']" class="btn btn-small btn-secondary">Edit</a>
              <button (click)="remove(p)" class="btn-small btn-danger">Delete</button>
            </td>
          </tr>
        } @empty {
          <tr><td colspan="4">No products</td></tr>
        }
      </tbody>
    </table>

    <div class="pager">
      <button (click)="page.set(page() - 1)" [disabled]="page() === 1" class="btn-secondary">‹ Prev</button>
      <span>Page {{ page() }} / {{ totalPages() }}</span>
      <button (click)="page.set(page() + 1)" [disabled]="page() === totalPages()" class="btn-secondary">Next ›</button>
    </div>
  `,
})
export class ProductsListComponent implements OnInit {
  private service = inject(ProductsService);
  readonly pageSize = 3;

  products = signal<Product[]>([]);
  category = signal('');
  page = signal(1);

  categories = computed(() => [...new Set(this.products().map((p) => p.category))]);

  filtered = computed(() =>
    this.category() ? this.products().filter((p) => p.category === this.category()) : this.products(),
  );

  totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize)));

  pagedProducts = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  ngOnInit() {
    this.service.list().subscribe((data) => this.products.set(data));
  }

  setCategory(category: string) {
    this.category.set(category);
    this.page.set(1);
  }

  remove(p: Product) {
    if (!confirm(`Delete "${p.title}"?`)) return;
    this.service.delete(p.id!).subscribe(() => {
      this.products.update((list) => list.filter((x) => x.id !== p.id));
      if (this.page() > this.totalPages()) this.page.set(this.totalPages());
    });
  }
}
