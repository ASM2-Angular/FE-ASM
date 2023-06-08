import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUSser } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  accout!: IUSser;
  constructor(
    private accountService: UserService,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private authService: AuthService,
    private router: Router,
  ) { }
  accountForm = this.fb.group({
    _id: [{ value: '', disabled: true }],
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    img: [''],
    role: [''],
    password: ['']
  })
  ngOnInit() {
    const storedUser = localStorage.getItem('credential');
    console.log(storedUser);

    if (storedUser) {
      const credential = JSON.parse(storedUser);
      const user = credential.user;
      console.log(user);


      this.accountForm.patchValue({
        _id: user._id,
        email: user.email,
        name: user.name,
        img: user.img,

      });
    }
  }

  HandleGetfile(file: any) {
    const fileArr = file.target.files[0];

    this.uploadService.uploadFile(fileArr).subscribe(data => {
      if (data && data.url) {
        this.accountForm.patchValue({
          img: data.url
        })
      }
    })
  }

  onHandleSubmit() {

    if (this.accountForm.valid) {
      const accout: IUSser = {
        _id: this.accout._id,
        name: this.accountForm.value.name || "",
        email: this.accountForm.value.email || "",
        img: this.accountForm.value.img || "",
        role: this.accout.role,
        password: this.accout.password


      }

      this.accountService.updateUser(this.accout).subscribe(updatedUser => {
        console.log('updatedUser', updatedUser);
        // Cập nhật thông tin người dùng thành công
        this.accout = updatedUser; // Cập nhật thông tin người dùng trong component
        localStorage.setItem('credential', JSON.stringify(this.accout));
        this.router.navigate(['account']);
      });
    }
  }
}
