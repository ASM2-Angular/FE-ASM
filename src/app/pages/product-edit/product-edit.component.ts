import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {
  product!: IProduct;
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: [0],
    img: ['', Validators.required],
    desc: ['', [Validators.required, Validators.minLength(4)]]
  })
  docs: any;
  products: any;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: ActivatedRoute,
    private route2: Router
  ) {
    this.router.paramMap.subscribe((params => {
      const id = (params.get('id'));  //
      // console.log(params.get('id'));
      // return;
      this.productService.getProduct(id!).subscribe(({ data }) => {
        this.product = data;
        // console.log(data);
        // console.log(this.product);


        this.productForm.patchValue({
          name: data.name,
          price: data.price,
          img: data.img,
          desc: data.desc

        })
      }, error => console.log(error.message))
    }))
  }
  onHandleSubmit() {
    if (this.productForm.valid) {
      const product: IProduct = {
        _id: this.product._id,
        name: this.productForm.value.name || "",
        price: this.productForm.value.price || 0,
        img: this.productForm.value.img || "",
        desc: this.productForm.value.desc || ""
      }

      this.productService.updateProduct(product).subscribe((product) => {
        console.log('product', product);
        this.route2.navigate(['/admin/product']);
      })
    }
  }
}
