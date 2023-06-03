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

const routes: Routes = [
  {
    path: '', component: BaseLayoutComponent, children: [
      { path: '', component: HomePageComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component:ContactComponent },
      {path: 'signup', component: SignupComponent},
      { path: 'product/:id', component: ProductDeitalComponent }
    ]
  },
  {
    path: 'admin', component: AdminLayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'product', component: ProductListComponent },
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

