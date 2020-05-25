import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/models/offer';
import { Event } from 'src/app/models/Event';
import { OfferService } from '../../../services/offer.service';
import { EventService } from '../../../services/event.service';
import {environment as env} from '../../../../environments/environment';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styles: []
})
export class OffersListComponent implements OnInit {

  offer : Offer[];
  event : Event[];
  eventArray: any[];
// path : string;
  constructor(private offerService : OfferService, private eventService : EventService ) {
    this.offer = [];
    this.event = [];
    // this.path = env.imageAddress;
   }
   DeleteData(id, index){
    this.offerService.DeletOffer(id).subscribe(res=>{
      this.offer.splice(index, 1);
    });
    
  

  }

  ngOnInit() {

    this.offerService.GetOffers().subscribe(res => {
      console.log("result is ") 
      
      this.offer = res;
      console.log(this.offer)
  });

  this.eventService.GetEvents().subscribe(res => {
    console.log("result for event is ") 
    
    this.event = res;
    console.log(this.event)
});
    
 }

}
