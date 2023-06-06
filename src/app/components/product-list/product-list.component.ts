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
  docs:any
  searchTerm: string = "";

  status: boolean = false;
  constructor(private productService: ProductService) {
    this.productService.getProducts().subscribe(data => {  
      this.docs = data;
      this.products = this.docs.docs;
      console.log(this.products);
      
    })
  }
  search() {
    if (this.searchTerm) {
      this.products = this.products.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.products = this.products;
    }
  }

  removeItem(_id: any) {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.productService.deleteProduct(_id).subscribe(() => {
        this.products = this.products.filter(product => product._id !== _id);
      });
      // this.onRemove.emit(id);
    }
  }
  
}



