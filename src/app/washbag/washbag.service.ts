import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProductsResponse, Product } from './washbag-model'
import {  map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WashbagService {
  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiUrl}/products`;

  getProducts(userId: number): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${this.apiUrl}/${userId}`);
  }

  getAvailableProducts(userId: number): Observable<Product[]> {
    return this.http.get<ProductsResponse>(`${this.apiUrl}/${userId}`).pipe(
      map(result => result.products.filter(item => item.availability))
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/add`, product)
  }

  deleteProduct(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/update`, product);
  }

}
