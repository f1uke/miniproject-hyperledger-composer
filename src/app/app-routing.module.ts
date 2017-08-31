import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { VehicleComponent } from './Vehicle/Vehicle.component';
import { VehicleListingComponent } from './VehicleListing/VehicleListing.component';
import { BankComponent } from './bank/bank.component';
import { CarComponent } from './car/car.component';
import { MemberComponent } from './member/member.component';

const routes: Routes = [
  // { path: 'transaction', component: TransactionComponent },
  { path: '', component: HomeComponent },

  { path: 'Vehicle', component: VehicleComponent },

  { path: 'VehicleListing', component: VehicleListingComponent },

  { path: 'Bank', component: BankComponent },

  { path: 'Car', component: CarComponent },

  { path: 'Member', component: MemberComponent },

  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
