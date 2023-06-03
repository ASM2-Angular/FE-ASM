import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private apiUrl = ' http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:8080/api/products')
  }
  deleteProduct(_id: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/products/${_id}`)
  }
 getProduct(_id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/products/${_id}`)
  }
  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>('http://localhost:8080/api/products', product)
  }
  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`http://localhost:8080/api/products/${product._id}`, product)
  }
}
