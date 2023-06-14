import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategory } from 'src/app/interfaces/Category';
import { IProduct } from 'src/app/interfaces/Product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products!: IProduct[]
  categories!: ICategory[];
  docs: any
  searchTerm: string = "";
  pageSize = 7;
  currentPage = 1;
  startIndex = 0;
  endIndex = this.pageSize;
  pages: number[] = [];


  constructor(private productService: ProductService, private categoryService: CategoryService) {


    this.productService.getProducts().subscribe(data => {
      this.docs = data;
      this.products = this.docs.docs;
      this.categoryService.getCategories().subscribe(data => {
        this.categories = data;
      });
      console.log(this.products);

      this.calculatePages();
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
  calculatePages() {
    const pageCount = Math.ceil(this.products.length / this.pageSize);
    this.pages = [];
    for (let i = 1; i <= pageCount; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.startIndex = (this.currentPage - 1) * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
  }

  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.startIndex = (this.currentPage - 1) * this.pageSize;
      this.endIndex = this.startIndex + this.pageSize;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.startIndex = (this.currentPage - 1) * this.pageSize;
      this.endIndex = this.startIndex + this.pageSize;
    }
  }

}