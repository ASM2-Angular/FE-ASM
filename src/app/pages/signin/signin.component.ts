import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { IUSser } from 'src/app/interfaces/User';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  user!: IUSser;
  incorrectPassword: boolean = false;
  emailExists: boolean = false;

  formSignin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  onHandleSubmit() {
    if (this.formSignin.valid) {
      this.auth.signin(this.formSignin.value).subscribe(data => {
        localStorage.setItem('credential', JSON.stringify(data));
        this.user = data.user;
        console.log(data);
        window.alert("Đăng nhập thành công");
        if (data.user.role === 'admin') {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['']);
        }
      }, error => {
        if (error.status === 400) {
          this.incorrectPassword = true;
        } 
      });
    }
  }
}
