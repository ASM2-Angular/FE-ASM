import { Component } from '@angular/core';
import { ICategory } from 'src/app/interfaces/Category';
import { IProduct } from 'src/app/interfaces/Product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent {
  pageSize = 3;
  currentPage = 1;
  startIndex = 0;
  endIndex = this.pageSize;
  pages: number[] = [];
  products!: IProduct[];
  docs: any;
  categories!: ICategory[]
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);

    })
    this.productService.getProducts().subscribe(data => {
      this.docs = data;
      this.products = this.docs.docs;
      console.log(data);

      console.log(this.products);
      this.calculatePages();
    })
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