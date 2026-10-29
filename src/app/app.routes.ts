import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProductsListComponent } from './products/products-list.component';
import { ProductDetailsComponent } from './products/product-details.component';
import { ProductFormComponent } from './products/product-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'products/:id/edit', component: ProductFormComponent },
  { path: '**', redirectTo: '' },
];
