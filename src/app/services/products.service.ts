import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  removeFavorite(id: any) {
    throw new Error('Method not implemented.');
  }

 url:string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }


// Home component

  getProducts():Observable<any>{
    return this.http.get<any>(`${this.url}/products`)
  }

  sendCart(product:any){
    return this.http.post<any>(`${this.url}/cart`, product)
  }

  // menu mobile
  
  public menuShow():void {
    let menuMobile = document.querySelector('.mobile-menu');

    if (menuMobile?.classList.contains('open')) {
      return menuMobile.classList.remove('open')
    } else {
      return menuMobile?.classList.add('open')
    }
  }


  // Cart component


  getCart():Observable<any>{
    return this.http.get<any>(`${this.url}/cart`)
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.url}/cart/${id}`);
  }
  
  
  // Favorite component
  
  


  sendFavorite(favorite:any){
    return this.http.post<any>(`${this.url}/favorites`, favorite)
  }
  getFavorite():Observable<any>{
    return this.http.get<any>(`${this.url}/favorites`)
  }
  
  deleteFavorite(id: string) {
    return this.http.delete(`${this.url}/favorites/${id}`);
  }
  

}
