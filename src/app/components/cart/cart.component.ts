import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  cart!:any[]
  total:number = 0
  productsCounter:number = 0

  constructor(private service: ProductsService){}


  ngOnInit(): void {
    this.getCart()
  }

  getCart(){
    this.service.getCart().subscribe((res) => {
      this.cart  = res
      this.total = res.map((el:any) => Number(el.price)).reduce((a:number,b:number)=>a+b,0)
      this.productsCounter = res.length
    })
  }
  deleteProduct(id:string){
    return this.service.deleteProduct(id).subscribe(()=>{
      this.getCart()
      this.productsCounter-=1
    })
  }

}
