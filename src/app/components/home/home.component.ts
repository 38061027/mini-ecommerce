import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { forkJoin, tap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChildren('btnFavorite') btnFavorites!: QueryList<ElementRef>;




  products!: any[]
  favorites!: any[]
  cartCounter: number = 0
  favoriteCounter: number = 0
  modal: boolean = false
  favoriteIds: string[] = [];


  constructor(private service: ProductsService,
    private renderer: Renderer2

  ) { }


  ngOnInit(): void {
    this.fetchData();
    this.updateFavoritetCounter()
    this.updateCartCounter()


  }

  ngAfterViewInit(): void {
    forkJoin({
      products: this.service.getProducts(),
      favorites: this.service.getFavorite()
    }).subscribe(({ products, favorites }) => {
      this.products = products;
      this.favorites = favorites;


      setTimeout(() => {
        this.btnFavorites.forEach((btn: any) => {
          const buttonElement = btn.nativeElement;
          const favoriteId = buttonElement.getAttribute('data-id');
          if (this.isFavorite(favoriteId)) {
            this.renderer.setStyle(buttonElement, 'color', 'red');
          }
        });
      }, 200);
    });
  }

  fetchData(): void {
    this.service.getProducts().subscribe(
      res => this.products = res
    );

    this.service.getFavorite().subscribe(
      res => this.favorites = res
    );
  }

  isFavorite(id: string): boolean {
    return this.favorites.some(favorite => favorite.id === id);
  }


  sendCart(product: any) {
    this.service.getCart().subscribe((cart) => {

      const isProductInCart = cart.some((item: any) => item.id === product.id);


      if (!isProductInCart) {
        this.service.sendCart(product).pipe(
          tap(() => this.updateCartCounter())
        ).subscribe();
      } else {
        this.modal = true;
        setTimeout(() => {
          this.modal = false

        }, 1500);

      }
    });
  }



  sendFavorite(favorite: any) {
    this.service.getFavorite().subscribe((res) => {

      const isProductInCart = res.some((item: any) => item.id === favorite.id);
      if (!isProductInCart) {
        this.service.sendFavorite(favorite).subscribe(() => {
          this.favoriteIds.push(favorite.id);
          this.updateFavoriteButtonColor(favorite.id);
          this.updateFavoritetCounter();
        });
      } else {
        this.service.deleteFavorite(favorite.id).subscribe(() => {
          this.favoriteIds = this.favoriteIds.filter((id) => id !== favorite.id);
          this.updateFavoriteButtonColor(favorite.id);
          this.updateFavoritetCounter();
        });
      }

    })

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

  updateFavoriteButtonColor(productId: string) {
    this.btnFavorites.forEach((btn: any) => {
      const buttonElement = btn.nativeElement;
      const favoriteId = buttonElement.getAttribute('data-id');
      if (favoriteId === productId) {
        const isFavorite = this.favoriteIds.includes(productId);
        const color = isFavorite ? 'red' : 'black'; 
        this.renderer.setStyle(buttonElement, 'color', color);
      }
    });
  }



}
