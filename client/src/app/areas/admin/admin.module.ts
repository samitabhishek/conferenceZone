import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddSponserComponent } from './add-sponser/add-sponser.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { UserListComponent } from './user-list/user-list.component';
import { EventListComponent } from './event-list/event-list.component';
import { SponsersListComponent } from './sponsers-list/sponsers-list.component';
import { OffersListComponent } from './offers-list/offers-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditEventComponent } from './edit-event/edit-event.component';




@NgModule({
  declarations: [AdminLayoutComponent, AdminHomeComponent, AddEventComponent, AddSponserComponent, AddOfferComponent, UserListComponent, EventListComponent, SponsersListComponent, OffersListComponent, EditEventComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot()
    
  ],
  providers: [
    DatePipe
  ],  

})
export class AdminModule { }
