import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-deital',
  templateUrl: './product-deital.component.html',
  styleUrls: ['./product-deital.component.scss']
})
export class ProductDeitalComponent {
  products!: IProduct[];
  docs: any;
  constructor(private productService: ProductService, private router: ActivatedRoute) {
    this.router.paramMap.subscribe((params => {
      const id = (params.get('id'));  //
      this.productService.getProduct(id!).subscribe(({ data }) => {
        this.products = [data];
        console.log(data);


        console.log(this.products);


      })
    }))
  }
}
