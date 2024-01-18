import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  products!:any[]
  cartCounter:number = 0

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

  sendCart(product:any){
    this.service.sendCart(product).subscribe(()=>{
      this.updateCartCounter()
    })
  }

  updateCartCounter() {
    this.service.getCart().subscribe(res => {
      this.cartCounter = res.length;
    });
  }

}
