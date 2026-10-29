import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  title: string;
  price: number;
  category: string;
  stock: number;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/products';

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(p: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, p);
  }

  update(id: number, p: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, p);
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
