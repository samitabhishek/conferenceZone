import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { HomeComponent } from './home/home.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { EventDeatailsComponent } from './event-deatails/event-deatails.component';
import { LoginComponent } from './login/login.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { SuccessTicketComponent } from './success-ticket/success-ticket.component';



const routes: Routes = [

  
  
  {path:'admin',loadChildren:()=>import('../app/areas/admin/admin.module').then(mod=>mod.AdminModule)},
  {path:'',component:PublicLayoutComponent , children:[
    {path:'',component:HomeComponent},
    {path:'buyticket',component:EventDeatailsComponent},
    {path:'login',component:LoginComponent},
    {path:'register/:id',component:UserRegistrationComponent},
    {path:'eventdetails/:id',component:EventDetailsComponent},
    {path:'success/:id',component:SuccessTicketComponent},
    // {path:'login',component:LoginComponent},
    // {path:'signup',component:SignupComponent},
    // {path:'signupdone',component:SignupdoneComponent},

  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
