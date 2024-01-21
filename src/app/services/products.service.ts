import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

 url:string = 'http://localhost:3000/products'
 urlCart:string = 'http://localhost:3000/cart'

  constructor(private http: HttpClient) { }


  getProducts():Observable<any>{
    return this.http.get<any>(this.url)
  }

  sendCart(product:any){
    return this.http.post<any>(`${this.urlCart}`, product)
  }
  

  // Cart component


  getCart():Observable<any>{
    return this.http.get<any>(this.urlCart)
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.urlCart}/${id}`);
  }

}
