import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { filter, tap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  products!:any[]
  cartCounter:number = 0
  modal:boolean = false

  constructor(private service: ProductsService){}

  
  ngOnInit(): void {
    this.getProducts()
    this.updateCartCounter()
  }
  
  getProducts(){
    this.service.getProducts().subscribe(
      res => this.products = res
      
    )

  }

  sendCart(product: any) {
    this.service.getCart().subscribe((cart) => {
    
      const isProductInCart = cart.some((item:any) => item.id === product.id);

     
      if (!isProductInCart) {
        this.service.sendCart(product).pipe(
          tap(() => this.updateCartCounter())
        ).subscribe();
      }else{
        this.modal = true;
        setTimeout(() => {
          this.modal = false
        
        }, 2500);
        
      }
    });
  }


  updateCartCounter() {
    this.service.getCart().subscribe(res => {
      this.cartCounter = res.length;
    });
  }

}
