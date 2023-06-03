import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent {
  products!: IProduct[];
  docs:any;
  constructor( private productService: ProductService) { 
    this.productService.getProducts().subscribe(data => {  
      this.docs = data;
      this.products = this.docs.docs;
      console.log(data);
      
      console.log(this.products);
      
    })
  }


}
