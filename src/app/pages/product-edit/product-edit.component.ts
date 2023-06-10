import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';

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
    desc: ['', [Validators.required, Validators.minLength(4)]],
    imgNew: ['']
  })
  docs: any;
  products: any;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: ActivatedRoute,
    private route2: Router,
    private uploadService: UploadService
  ) {
    this.router.paramMap.subscribe((params => {
      const id = (params.get('id'));  //
      // console.log(params.get('id'));
      // return;
      // this.productService.getProduct(id!).subscribe(({ data }) => { 
      //   this.product = data;
      //   console.log(data);  
      //   // console.log(this.product);
      //   this.productForm.patchValue({
      //     name: data.name,
      //     price: data.price,
      //     img: data.img,
      //     desc: data.desc


      //   })
      //   console.log(this.productForm.value);

      // }, error => console.log(error.message))
      if (id) {
        this.productService.getProduct(id!).subscribe((data: any) => {
          console.log(data.data);
          if (data && data.data) {
            this.productForm.patchValue({
              name: data.data.name,
              price: data.data.price,
              desc: data.data.desc,
              img: data.data.img
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
            desc: this.productForm.value.desc || ""

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