import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]], 
    price: [0],
    img: ['',Validators.required],
    desc: ['', [Validators.required, Validators.minLength(4)]]
  })

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }

<<<<<<< HEAD
  onHandleSubmit() {
    const product: IProduct = {
      name: this.productForm.value.name || '',
      price: this.productForm.value.price || 0,
      desc: this.productForm.value.desc || '',
=======
    onHandleSubmit() {
      const product:IProduct = {
        name: this.productForm.value.name || '', 
        price: this.productForm.value.price || 0,
        img: this.productForm.value.img || '',
        desc: this.productForm.value.desc || ''

>>>>>>> 0446abb59cbd7799b4d35fa7fbf5e76968715a53

    }
    this.productService.addProduct(product).subscribe(data => {
      console.log('product', product);
      this.router.navigate(['/admin/product']);

    }

    )
  }
}
