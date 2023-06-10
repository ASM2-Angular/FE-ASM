import { Component } from '@angular/core';
import { ICategory } from 'src/app/interfaces/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  categories!: ICategory[];
  myName: string = "";
  docs: any
  searchTerm: string = "";

  status: boolean = false;
  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategories().subscribe(data => {

      this.categories = data;
      console.log(this.categories);

    })
  }
  search() {
    if (this.searchTerm) {
      this.categories = this.categories.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.categories = this.categories;
    }
  }

  removeItem(_id: any) {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      this.categoryService.deleteCategory(_id).subscribe(() => {
        this.categories = this.categories.filter(category => category._id !== _id);
      });
      // this.onRemove.emit(id);
    }
  }
}
