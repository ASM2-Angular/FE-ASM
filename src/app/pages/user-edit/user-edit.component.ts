import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUSser } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  user!: IUSser;
  userForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['']
  })
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: ActivatedRoute,
    private route2: Router
  ) {
    this.router.paramMap.subscribe((params => {
      const id = (params.get('id'));

      this.userService.getUser(id!).subscribe(({ data }) => {
        this.user = data;

        this.userForm.patchValue({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role

        })
      }, error => console.log(error.message))
    }))
  }
  onHandleSubmit() {
    if (this.userForm.valid) {
      const user: IUSser = {
        _id: this.user._id,
        name: this.userForm.value.name || "",
        email: this.userForm.value.email || "",
        password: this.userForm.value.password || "",
        role: this.userForm.value.role || "",
      }

      this.userService.updateUser(user).subscribe((user) => {
        console.log('user', user);
        this.route2.navigate(['/admin/user']);
      })
    }
  }
}
