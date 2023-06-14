import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('http://localhost:8080/api/categories')
  }
  deleteCategory(_id: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/categories/${_id}`)
  }
  getCategory(_id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/categories/${_id}`)
  }
  addCategory(categories: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>('http://localhost:8080/api/categories', categories)
  }
  updateCategory(categories: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`http://localhost:8080/api/categories/${categories._id}`, categories)
  }
}
