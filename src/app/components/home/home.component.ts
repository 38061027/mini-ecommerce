import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import {  tap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,AfterViewInit{
  @ViewChildren('btnFavorite') btnFavorites!: QueryList<ElementRef>;




  products!:any[]
  favorites!:any[]
  cartCounter:number = 0
  favoriteCounter:number = 0
  modal:boolean = false


  constructor(private service: ProductsService,
    private renderer:Renderer2

    ){}
    
    
    ngOnInit(): void {
      this.getProducts()
    this.updateCartCounter()
      this.updateFavoritetCounter()

  }
  
  ngAfterViewInit(): void {
    
    setTimeout(() => {
      this.btnFavorites.forEach((btn:any) => {
        const buttonElement = btn.nativeElement;
        if (buttonElement) {
          this.renderer.setStyle(buttonElement, 'color', 'red');
        }
      });
    }, 200);
  }
  
  getProducts(){
    this.service.getProducts().subscribe(
      res => this.products = res)

  }

  getFavorites(){
    this.service.getFavorite().subscribe(res => this.favorites = res)
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

  updateFavoritetCounter() {
    this.service.getFavorite().subscribe(res => {
      this.favoriteCounter = res.length;
  
    });
  }


  sendFavorite(favorite:any){
    this.service.sendFavorite(favorite).subscribe(()=>{
      this.updateFavoritetCounter()
    })
  }

}
