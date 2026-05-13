import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartManagerComponent } from './components/cart-manager/cart-manager.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { VipClientsComponent } from './components/vip-clients/vip-clients.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'carts', component: CartManagerComponent },
  { path: 'carts/:id', component: CartDetailComponent },
  { path: 'vip-clients', component: VipClientsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
