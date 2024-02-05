import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  id!: number
  product: any

  constructor(private route: ActivatedRoute,
    private service: ProductsService
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getProducts().pipe(
      map(cartItems => cartItems.filter((item: any) => item.id === this.id)),
    ).subscribe(res => res.map((el: any) => this.product = el));
  }



}
