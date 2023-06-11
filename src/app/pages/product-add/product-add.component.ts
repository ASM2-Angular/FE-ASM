import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { ICategory } from 'src/app/interfaces/Category';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {
  categories!: ICategory[]
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: [0],
    img: ['', Validators.required],
    desc: ['', [Validators.required, Validators.minLength(4)]],
    categoryId: ['']
  })

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private uploadService: UploadService,
    private categoryService: CategoryService
  ) {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);

    })
  }

  HandleGetfile(file: any) {
    console.log(file.target.files[0]);
    const fileArr = file.target.files[0];
    this.uploadService.uploadFile(fileArr).subscribe(data => {
      console.log(data.url);
      this.productForm.patchValue({
        img: data.url
      })
    })
  }

  onHandleSubmit() {
    const product: IProduct = {
      name: this.productForm.value.name || '',
      price: this.productForm.value.price || 0,
      img: this.productForm.value.img || '',
      desc: this.productForm.value.desc || '',
      categoryId: this.productForm.value.categoryId || ''


    }
    this.productService.addProduct(product).subscribe(data => {
      console.log('product', product);
      this.router.navigate(['/admin/product']);

    }

    )
  }
}