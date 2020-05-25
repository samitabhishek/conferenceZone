import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { EventService } from '../../../services/event.service';
import {environment as env} from '../../../../environments/environment';
import { Sponser } from 'src/app/models/Sponser';
import { Offer } from 'src/app/models/offer';
import { SponserService } from 'src/app/services/sponser.service';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styles: []
})
export class EventListComponent implements OnInit {

  event : Event[];
  sponser : Sponser[];
  offer : Offer[];
  path : string;
  constructor(private eventService : EventService, private sponserService : SponserService, private offerService : OfferService) {
    this.event = [];
    this.path = env.imageAddress;
   }
   DeleteData(id, index){
    this.eventService.DeleteEvent(id).subscribe(res=>{
      this.event.splice(index, 1);
    });
    
  

  }

  ngOnInit() {
    console.log(this.path);
   
    this.eventService.GetEvents().subscribe(res => {
      console.log("result is ") 
      console.log(res);
      this.event = res;
  });
  this.offerService.GetOffers().subscribe(res => {
    console.log("result is ") 
    console.log(res);
    this.offer = res;
});
this.sponserService.GetSponsers().subscribe(res => {
  console.log("result is ") 
  console.log(res);
  this.sponser = res;
});
 }
}
