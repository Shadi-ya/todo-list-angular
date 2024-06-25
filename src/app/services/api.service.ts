import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http:HttpClient) { }

  getTodo():Observable<any>{
    return this.http.get<any>('https://jsonplaceholder.typicode.com/todos');
  }
}
