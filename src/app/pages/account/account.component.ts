import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: ActivatedRoute
  ) {
    this.router.paramMap.subscribe((params => {
      const id = (params.get('id'));

      this.accountService.getUser(id!).subscribe(({ data }) => {
        this.accout = data;

        this.accountForm.patchValue({
          name: data.name,
          email: data.email,
          password: data.password,
          img: data.img,
          role: data.role

        })
      }, error => console.log(error.message))
    }))
  }
  accountForm = this.fb.group({

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
      const id = this.accout._id; // Lấy giá trị id từ accout
      const account: IUSser = {
        _id: id,
        name: this.accountForm.value.name || "",
        email: this.accountForm.value.email || "",
        img: this.accountForm.value.img || "",
        role: this.accountForm.value.role || "",
        password: this.accountForm.value.password || ""
      };

      this.accountService.updateUser(account).subscribe(updatedUser => {
        console.log('updatedUser', updatedUser);
        this.accout = updatedUser; // Cập nhật thông tin người dùng trong component
        alert('Sửa thành công');
        window.location.reload();
      });
    }
  }

}
