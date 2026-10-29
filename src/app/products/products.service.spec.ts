import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Product, ProductsService } from './products.service';

const API = 'http://localhost:3000/products';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('list() sends GET and returns products', () => {
    const mock: Product[] = [
      { id: 1, title: 'A', price: 10, category: 'X', stock: 1 },
      { id: 2, title: 'B', price: 20, category: 'Y', stock: 2 },
    ];

    service.list().subscribe((data) => expect(data).toEqual(mock));

    const req = httpMock.expectOne(API);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('create() sends POST with product body', () => {
    const product: Product = { title: 'New', price: 100, category: 'X', stock: 3 };

    service.create(product).subscribe((data) => expect(data.id).toBe(9));

    const req = httpMock.expectOne(API);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(product);
    req.flush({ ...product, id: 9 });
  });

  it('delete() sends DELETE to /products/:id', () => {
    service.delete(1).subscribe();

    const req = httpMock.expectOne(`${API}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
