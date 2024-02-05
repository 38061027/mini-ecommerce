import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cart: any[] = [];
  total: number = 0;
  productsCounter: number = 0;

  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.service.getCart().subscribe((res) => {
      this.cart = res;
      this.calculateTotal();
    });
  }

  deleteProduct(id: string) {
    this.service.deleteProduct(id).subscribe(() => {
      this.getCart();
      this.productsCounter--;
    });
  }

  increment(product: any) {
    product.quantity = (product.quantity || 0) + 1;
    this.calculateTotal();
  }

  decrement(product: any) {
    if (product.quantity && product.quantity > 0) {
      product.quantity--;
      this.calculateTotal();
    }
  }

  calculateTotal() {
    let currentTotal = this.cart.reduce((a,b)=>Number(a)+Number(b.price),0)
    this.total = this.cart.reduce((acc, curr) => acc + (curr.price * (curr.quantity || 0)),currentTotal);
    let currentProducts = this.cart.length
    this.productsCounter = this.cart.reduce((acc, curr) => acc + (curr.quantity || 0), currentProducts);
  }

}
