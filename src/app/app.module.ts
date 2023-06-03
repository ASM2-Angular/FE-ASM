import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutComponent } from './pages/about/about.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminProductComponent } from './pages/admin/admin-product/admin-product.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductDeitalComponent } from './pages/product-deital/product-deital.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { SignLayoutComponent } from './layouts/sign-layout/sign-layout.component';
import { SigninComponent } from './pages/signin/signin.component';


// decorators
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HomePageComponent,
    AboutComponent,
    PageNotFoundComponent,
    DashboardComponent,
    AdminProductComponent,
    AdminLayoutComponent,
    BaseLayoutComponent,
    SignupComponent,
    ContactComponent,
    ProductDeitalComponent,
    ProductEditComponent,
    ProductAddComponent,
    SignLayoutComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
