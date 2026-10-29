import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ProductsListComponent } from './products-list.component';
import { Product } from './products.service';

const mockProducts: Product[] = [
  { id: 1, title: 'Keyboard', price: 1200, category: 'Peripherals', stock: 5 },
  { id: 2, title: 'Mouse', price: 800, category: 'Peripherals', stock: 12 },
  { id: 3, title: 'Monitor', price: 5200, category: 'Monitors', stock: 3 },
  { id: 4, title: 'Headphones', price: 2100, category: 'Audio', stock: 8 },
  { id: 5, title: 'Speakers', price: 1700, category: 'Audio', stock: 6 },
];

describe('ProductsListComponent', () => {
  let fixture: ComponentFixture<ProductsListComponent>;
  let component: ProductsListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductsListComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    TestBed.inject(HttpTestingController).expectOne('http://localhost:3000/products').flush(mockProducts);
    fixture.detectChanges();
  });

  it('shows only the first page (3 products)', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
    expect(component.totalPages()).toBe(2);
  });

  it('filters products by category and resets page', () => {
    component.page.set(2);
    component.setCategory('Audio');

    expect(component.filtered().length).toBe(2);
    expect(component.filtered().every((p) => p.category === 'Audio')).toBeTrue();
    expect(component.page()).toBe(1);
  });
});
