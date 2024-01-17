import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

 url:string = 'http://localhost:3000/products'

  constructor(private http: HttpClient) { }


  getProducts():Observable<any>{
    return this.http.get<any>(this.url)
  }

}