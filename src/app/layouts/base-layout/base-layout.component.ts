import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUSser } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent {
  user!: IUSser | null;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    const authenticatedUser = this.authService.isAuthenticated();
    this.user = authenticatedUser?.user;
    console.log(this.user);

  }
  logout() {
    localStorage.removeItem('credential');
    this.user = null;
    this.router.navigate(['/signin']);
  }
}