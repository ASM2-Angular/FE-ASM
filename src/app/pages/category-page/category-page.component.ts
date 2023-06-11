import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

import { ICategory } from 'src/app/interfaces/Category';
@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent {
  pageSize = 3;
  currentPage = 1;
  startIndex = 0;
  endIndex = this.pageSize;
  pages: number[] = [];
  products!: IProduct[];
  docs: any;
  constructor(
    private productService: ProductService, private router: ActivatedRoute
  ) {
    this.router.paramMap.subscribe((params => {
      const categoryId = (params.get('categoryId'));  //
      this.productService.getProductsByCategory(categoryId!).subscribe((data => {
        this.products = data;
        console.log(data);


        console.log(this.products);


        this.calculatePages();
      }))
    }))
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
