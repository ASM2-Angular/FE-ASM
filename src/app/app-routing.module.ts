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
import { AccountComponent } from './pages/account/account.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { CartProductComponent } from './pages/cart-product/cart-product.component';
import { AuthGuard } from './auth.guard';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryAddComponent } from './pages/category-add/category-add.component';
import { CategoryEditComponent } from './pages/category-edit/category-edit.component';
const routes: Routes = [
  {
    path: '', component: BaseLayoutComponent, children: [
      { path: '', component: HomePageComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'product/:id', component: ProductDeitalComponent },

      { path: 'account/:id', component: AccountComponent },
      { path: 'account/:id/changepassword', component: ChangePasswordComponent },

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
    path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'product', component: ProductListComponent },
      { path: 'product/add', component: ProductAddComponent },
      { path: 'product/:id/edit', component: ProductEditComponent },
      { path: 'user', component: UserListComponent },
      { path: 'category', component: CategoryListComponent },
      { path: 'user/:id/edit', component: UserEditComponent },
      { path: 'category/add', component: CategoryAddComponent },
      { path: 'category/:id/edit', component: CategoryEditComponent },
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

