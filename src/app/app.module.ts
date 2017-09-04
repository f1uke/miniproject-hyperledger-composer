import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { VehicleComponent } from './Vehicle/Vehicle.component';
import { VehicleListingComponent } from './VehicleListing/VehicleListing.component';

import {AccordionModule} from 'primeng/primeng';     //accordion and accordion tab
import {MenuItem} from 'primeng/primeng';
import {ButtonModule, DropdownModule, FieldsetModule} from 'primeng/primeng';            //api

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CarComponent } from './car/car.component';
import { BankComponent } from './bank/bank.component';
import { MemberComponent } from './member/member.component';
import { ContentComponent } from './member/content/content.component';
import { LoginComponent } from './member/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    VehicleComponent,
		
    VehicleListingComponent,
		
    CarComponent,
		
    BankComponent,
		
    MemberComponent,
		
    ContentComponent,
		
    LoginComponent,
		
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AccordionModule,
    BrowserAnimationsModule,
    ButtonModule,
    DropdownModule,
    FieldsetModule
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
