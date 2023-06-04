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
  constructor(private userService: UserService) {
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
}
