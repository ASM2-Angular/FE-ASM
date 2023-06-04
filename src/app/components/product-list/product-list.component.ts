import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  // @Input() products!: IProduct[]
  // @Output() onRemove = new EventEmitter<any>();
  products!: IProduct[]
  myName: string = "";
  docs: any

  status: boolean = false;
  constructor(private productService: ProductService) {
    this.productService.getProducts().subscribe(data => {
      this.docs = data;
      this.products = this.docs.docs;
      console.log(this.products);

    })
  }

  setValue(e: any) {
    this.myName = e.target.value;
  }
  toggle() {
    this.status = !this.status;
  }

  // removeItem(_id: any) {
  //   this.productService.deleteProduct(_id).subscribe(() => {
  //     this.products = this.products.filter(product => product._id !== _id)  
  //   })
  //   // this.onRemove.emit(id);
  // }

  removeItem(_id: any) {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.productService.deleteProduct(_id).subscribe(() => {
        this.products = this.products.filter(product => product._id !== _id);
      });
      // this.onRemove.emit(id);
    }
  }
}



