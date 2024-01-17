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

  constructor(private service: ProductsService){}

  getProducts(){
    this.service.getProducts().subscribe(
      res => this.products = res
    )
  }

  ngOnInit(): void {
    this.getProducts()
  }
  

}
