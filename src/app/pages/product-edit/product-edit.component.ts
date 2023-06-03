import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
import{ Router } from '@angular/router';

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
    desc: ['']
  })

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: ActivatedRoute,
    private route2: Router
  ) {
    this.router.paramMap.subscribe((params => {
      const _id = Number(params.get('_id'));
      this.productService.getProduct('_id').subscribe(data => {
        this.product = data;

        this.productForm.patchValue({
          name: data.name,
          price: data.price,
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
        desc: this.product.desc || "",
      }

      this.productService.updateProduct(product).subscribe((product) => {
        console.log('product', product);
        this.route2.navigate(['/admin/product']);
      })
    }
  }
}
