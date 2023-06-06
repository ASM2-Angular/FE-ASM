import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
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
    private router: Router,
    private uploadService: UploadService 
  ) { }

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
      const product:IProduct = {
        name: this.productForm.value.name || '', 
        price: this.productForm.value.price || 0,
        img: this.productForm.value.img || '',
        desc: this.productForm.value.desc || ''


    }
    this.productService.addProduct(product).subscribe(data => {
      console.log('product', product);
      this.router.navigate(['/admin/product']);

    }

    )
  }
}
