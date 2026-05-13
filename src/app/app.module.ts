import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CartManagerComponent } from './components/cart-manager/cart-manager.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { VipClientsComponent } from './components/vip-clients/vip-clients.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartManagerComponent,
    CartDetailComponent,
    VipClientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
