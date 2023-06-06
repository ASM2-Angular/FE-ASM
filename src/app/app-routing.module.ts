import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductDeitalComponent } from './pages/product-deital/product-deital.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { SignLayoutComponent } from './layouts/sign-layout/sign-layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
<<<<<<< HEAD
import { AccountComponent } from './pages/account/account.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
=======
import { CartProductComponent } from './pages/cart-product/cart-product.component';
>>>>>>> 6eebfe8d06bd4db3410d4884f9a327247604e1e0

const routes: Routes = [
  {
    path: '', component: BaseLayoutComponent, children: [
      { path: '', component: HomePageComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'product/:id', component: ProductDeitalComponent },

      { path: 'account', component: AccountComponent },
      { path: 'account/changepassword', component: ChangePasswordComponent },

      { path: 'cart', component: CartProductComponent },

    ]
  },
  {
    path: '', component: SignLayoutComponent, children: [
      { path: 'signup', component: SignupComponent },
      { path: 'signin', component: SigninComponent }
    ]
  },
  {
    path: 'admin', component: AdminLayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'product', component: ProductListComponent },
      { path: 'product/add', component: ProductAddComponent },
      { path: 'product/:id/edit', component: ProductEditComponent },
      { path: 'user', component: UserListComponent },
      { path: 'user/:id/edit', component: UserEditComponent }

    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

// admin/dashboard

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

