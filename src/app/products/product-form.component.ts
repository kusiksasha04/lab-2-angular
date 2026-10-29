import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <h2>{{ id ? 'Edit product' : 'New product' }}</h2>

    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>
        Title
        <input formControlName="title" />
      </label>
      @if (isInvalid('title')) {
        <small class="error">Title is required (min 2 characters)</small>
      }

      <label>
        Price
        <input type="number" formControlName="price" />
      </label>
      @if (isInvalid('price')) {
        <small class="error">Price must be at least 1</small>
      }

      <label>
        Category
        <input formControlName="category" />
      </label>
      @if (isInvalid('category')) {
        <small class="error">Category is required</small>
      }

      <label>
        Stock
        <input type="number" formControlName="stock" />
      </label>
      @if (isInvalid('stock')) {
        <small class="error">Stock cannot be negative</small>
      }

      <div class="form-actions">
        <button type="submit" [disabled]="form.invalid">Save</button>
        <a routerLink="/products" class="btn btn-secondary">Cancel</a>
      </div>
    </form>
  `,
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(ProductsService);

  id = Number(this.route.snapshot.paramMap.get('id')) || null;

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    price: [0, [Validators.required, Validators.min(1)]],
    category: ['', Validators.required],
    stock: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit() {
    if (this.id) {
      this.service.get(this.id).subscribe((p) => this.form.patchValue(p));
    }
  }

  isInvalid(name: string): boolean {
    const control = this.form.get(name);
    return !!control && control.invalid && control.touched;
  }

  onSubmit() {
    const product = this.form.getRawValue();
    const request = this.id ? this.service.update(this.id, product) : this.service.create(product);
    request.subscribe(() => this.router.navigate(['/products']));
  }
}
