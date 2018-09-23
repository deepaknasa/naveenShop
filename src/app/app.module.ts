import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CustomFormsModule} from 'ng2-validation';

import {DataTableModule} from 'angular-6-datatable';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { LoginComponent } from './login/login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AuthService } from './auth.service';
import { AuthGaurd } from './auth-gaurd-service.service';
import { UserService } from './user.service';
import { AdminAuthGaurd } from './admin-auth-gaurd.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    LoginComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  imports: [
    CustomFormsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    DataTableModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path:'',component:ProductsComponent},
      {path:'products',component:ProductsComponent},
      {path:'shopping-cart',component:ShoppingCartComponent},
      {path:'login',component:LoginComponent},

      {path:'check-out',component:CheckOutComponent,canActivate:[AuthGaurd]},
      {path:'order-success',component:OrderSuccessComponent,canActivate:[AuthGaurd]},
      {path:'my/orders',component:MyOrdersComponent,canActivate:[AuthGaurd]},
      {
        path:'admin/product/new',
        component:ProductFormComponent,
        canActivate:[AuthGaurd,AdminAuthGaurd]
      },
      {
        path:'admin/product/:id',
        component:ProductFormComponent,
        canActivate:[AuthGaurd,AdminAuthGaurd]
      },
      {
        path:'admin/products',
        component:AdminProductsComponent,
        canActivate:[AuthGaurd,AdminAuthGaurd]
      },
      {
        path:'admin/orders',
        component:AdminOrdersComponent,
        canActivate:[AuthGaurd,AdminAuthGaurd]
      }
    ])
  ],
  providers: [
    AuthService,
    AuthGaurd,
    UserService,
    AdminAuthGaurd,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
