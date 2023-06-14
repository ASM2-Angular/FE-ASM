import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/app/interfaces/Category';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {
  product!: IProduct;
  categories!: ICategory[]
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: [0],
    img: ['', Validators.required],
    desc: ['', [Validators.required, Validators.minLength(4)]],
    imgNew: [''],
    categoryId: ['']
  })
  docs: any;
  products: any;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: ActivatedRoute,
    private route2: Router,
    private uploadService: UploadService,
    private categoryService: CategoryService
  ) {
    this.router.paramMap.subscribe((params => {
      this.categoryService.getCategories().subscribe(data => {
        this.categories = data;
        console.log(this.categories);

      })
      const id = (params.get('id'));  //
      if (id) {
        this.productService.getProduct(id!).subscribe((data: any) => {
          console.log(data.data);
          if (data && data.data) {
            this.productForm.patchValue({
              name: data.data.name,
              price: data.data.price,
              desc: data.data.desc,
              img: data.data.img,
              categoryId: data.data.categoryId
            })
          }
        })
      }
    }))
  }
  HandleGetfile(file: any) {
    const fileArr = file.target.files[0];

    this.uploadService.uploadFile(fileArr).subscribe(data => {
      if (data && data.url) {
        this.productForm.patchValue({
          img: data.url
        })
      }
    })
  }
  onHandleSubmit() {
    if (this.productForm.valid) {
      if (this.productForm.value.imgNew) {
        const image = this.productForm.value.imgNew;
        console.log(image);
        // this.productForm.value.img = this.productForm.value.imgNew;
      } else {
        // this.productForm.value.img = this.productForm.value.img;
      }
      this.router.paramMap.subscribe((params) => {
        const id = (params.get('id'))
        if (id) {
          const product: IProduct = {
            _id: id,
            name: this.productForm.value.name || "",
            price: this.productForm.value.price || 0,
            img: this.productForm.value.img || "",
            desc: this.productForm.value.desc || "",
            categoryId: this.productForm.value.categoryId || ''

          }
          this.productService.updateProduct(product).subscribe((product) => {
            console.log('product', product);
            this.route2.navigate(['/admin/product']);
          })
        }
      })

    }
  }
}