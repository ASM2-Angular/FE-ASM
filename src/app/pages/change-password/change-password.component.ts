import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUSser } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  accout!: IUSser;
  accountForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    img: [''],
    role: [''],
    password: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  })
  constructor(
    private accountService: UserService,
    private fb: FormBuilder,
    private router: ActivatedRoute
  ) {
    this.router.paramMap.subscribe((params => {
      const id = (params.get('id'));

      this.accountService.getUser(id!).subscribe(({ data }) => {
        this.accout = data;

        this.accountForm.patchValue({
          name: data.name,
          email: data.email,
          role: data.role
        })
      }, error => console.log(error.message))
    }))
  }
  checkOldPassword(): boolean {
    const oldPassword = this.accountForm.value.password;
    const hashedPassword = this.accout.password;

    if (oldPassword === null || oldPassword === undefined) {
      return false; // Không có mật khẩu nhập vào
    }

    const isPasswordMatched = bcrypt.compareSync(oldPassword, hashedPassword);

    return isPasswordMatched;
  }
  onHandleSubmit() {
    if (this.accountForm.valid) {
      const newPassword = this.accountForm.value.newPassword;
      const confirmPassword = this.accountForm.value.confirmPassword;

      if (newPassword !== confirmPassword) {
        alert('Xác nhận mật khẩu không khớp');
        return;
      }
      if (!this.checkOldPassword()) {
        alert('Mật khẩu cũ không chính xác');
        return;
      }
      const id = this.accout._id;
      const account: IUSser = {
        _id: id,
        name: this.accountForm.value.name || "",
        email: this.accountForm.value.email || "",
        img: this.accountForm.value.img || "",
        role: this.accountForm.value.role || "",
        password: newPassword ?? "",
      };
      this.accountService.updateUser(account).subscribe(updatedUser => {
        console.log('updatedUser', updatedUser);
        this.accout = updatedUser;
        alert('Đổi mật khẩu thành công');
        window.location.reload();
      });
    }
  }
}
