import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product, ProductsService } from './products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a routerLink="/products">← Back to list</a>

    @if (loading()) {
      <p class="muted">Loading...</p>
    }
    @if (error()) {
      <p class="error">{{ error() }}</p>
    }
    @if (product(); as p) {
      <h2 style="margin-top: 16px">{{ p.title }}</h2>
      <p><span class="badge">{{ p.category }}</span></p>
      <p>Price: <strong>{{ p.price }} ₴</strong></p>
      <p>In stock: <strong>{{ p.stock }}</strong></p>
      <a [routerLink]="['/products', p.id, 'edit']" class="btn">Edit</a>
    }
  `,
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(ProductsService);

  product = signal<Product | null>(null);
  loading = signal(false);
  error = signal('');

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading.set(true);
    this.service.get(id).subscribe({
      next: (data) => {
        this.product.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load product');
        this.loading.set(false);
      },
    });
  }
}
