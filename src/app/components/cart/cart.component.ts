import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  cart!:any[]

  constructor(private service: ProductsService){}


  ngOnInit(): void {
    this.getCart()
  }

  getCart(){
    this.service.getCart().subscribe(res => this.cart  = res)
  }

}
