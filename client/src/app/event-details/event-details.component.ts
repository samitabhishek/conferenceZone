import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { EventService } from '../services/event.service';
import {environment as env} from '../../environments/environment';
import { Sponser } from 'src/app/models/Sponser';
import { Offer } from 'src/app/models/offer';
import { SponserService } from 'src/app/services/sponser.service';
import { OfferService } from 'src/app/services/offer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styles: []
})
export class EventDetailsComponent implements OnInit {

  event : Event;
  sponser : Sponser[];
  offer : Offer[];
  path : string;
  constructor(private eventService : EventService, private sponserService : SponserService, private offerService : OfferService,  private route: ActivatedRoute) {
    this.event = new Event();
    this.path = env.imageAddress;
   }
 
    
  

  

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.eventService.GetEvent(id).subscribe(res => {
        console.log("result is ") 
        console.log(res);
        this.event = res;
    });

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
