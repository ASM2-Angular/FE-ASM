import { Component } from '@angular/core';
import { IUSser } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  user!: IUSser[];
  data: any;
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10', 'Item 11'];
  pageSize = 7;
  currentPage = 1;
  startIndex = 0;
  endIndex = this.pageSize;
  pages: number[] = [];

  constructor(private userService: UserService) {
    this.calculatePages();
    this.userService.getUsers().subscribe(data => {
      this.data = data;
      this.user = this.data.data;
      console.log(this.user);

    })
  }
  removeUser(_id: any) {
    this.userService.deleteUser(_id).subscribe(() => {
      this.user = this.user.filter(user => user._id !== _id)
    })
  }
  calculatePages() {
    const pageCount = Math.ceil(this.items.length / this.pageSize);
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
