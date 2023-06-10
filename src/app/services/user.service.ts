import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUSser } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUSser[]> {
    return this.http.get<IUSser[]>('http://localhost:8080/api/users')
  }
  deleteUser(_id: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/users/${_id}`)
  }
  getUser(_id: string): Observable<any> {
    return this.http.get(`http://localhost:8080/api/users/${_id}`)
  }

  updateUser(user: IUSser): Observable<IUSser> {
    return this.http.put<IUSser>(`http://localhost:8080/api/users/${user._id}`, user)
  }

}
