import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  submitted: boolean = false;

  formSignin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(6)]],
  }, { validators: this.checkPasswords });

  constructor(private fb: FormBuilder, private auth: AuthService,private router: Router,) {

  }

  checkPasswords(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password === confirmPassword) return null;
    return { notMatch: true };
  }

  onHandleSubmit() {
    this.submitted = true;
    if (this.formSignin.valid) {
      this.auth.signup(this.formSignin.value).subscribe(data => {
        console.log(data);
          window.alert('Đăng nhập thành công')
         this.router.navigate(['/home']); 
      });
    }
  }




}
