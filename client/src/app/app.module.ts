import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { HomeComponent } from './home/home.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EventDeatailsComponent } from './event-deatails/event-deatails.component';
import { LoginComponent } from './login/login.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { SuccessTicketComponent } from './success-ticket/success-ticket.component';


@NgModule({
  declarations: [
    AppComponent,
    PublicLayoutComponent,
    HomeComponent,
    UserRegistrationComponent,
    AdminLoginComponent,
    EventDeatailsComponent,
    LoginComponent,
    EventDetailsComponent,
    SuccessTicketComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
