import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit{

  favorites!:any[]
  

constructor(private service: ProductsService){}


ngOnInit(): void {
  this.getFavorite()
}

  getFavorite(){
    this.service.getFavorite().subscribe(res => this.favorites = res)
  }

  deleteFavorite(id:string){
    this.service.deleteFavorite(id).subscribe(()=>{
      this.getFavorite()
    })
  }



}
