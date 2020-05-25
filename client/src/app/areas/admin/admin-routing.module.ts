import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CommonModule } from '@angular/common';
import { AddEventComponent } from './add-event/add-event.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { AddSponserComponent } from './add-sponser/add-sponser.component';
import { UserListComponent } from './user-list/user-list.component';
import { EventListComponent } from './event-list/event-list.component';
import { SponsersListComponent } from './sponsers-list/sponsers-list.component';
import { OffersListComponent } from './offers-list/offers-list.component';
import { EditEventComponent } from './edit-event/edit-event.component';


const routes: Routes = [
  {path:'', component: AdminLayoutComponent,children:[
    {path: '', component:AdminHomeComponent },
    {path: 'addevent', component:AddEventComponent},
    {path: 'editevent/:id', component:EditEventComponent},
    {path: 'addoffer', component:AddOfferComponent},
    {path: 'addsponser', component:AddSponserComponent},
    {path: 'userlist', component:UserListComponent},
    {path: 'eventlist', component:EventListComponent},
    {path: 'sponserslist', component:SponsersListComponent},
    {path: 'offerslist', component:OffersListComponent},
    

]},

];

@NgModule({
  imports: [RouterModule.forChild(routes),
    CommonModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
