import { Component, OnInit } from '@angular/core';
import { Sponser } from 'src/app/models/Sponser';
import { Event } from 'src/app/models/Event';
import { SponserService } from '../../../services/sponser.service';
import { EventService } from '../../../services/event.service';
import {environment as env} from '../../../../environments/environment';

@Component({
  selector: 'app-sponsers-list',
  templateUrl: './sponsers-list.component.html',
  styles: []
})
export class SponsersListComponent implements OnInit {

  sponser : Sponser[];
  event : Event[];
  path : string;
  constructor(private sponserService : SponserService,private eventService : EventService) {
    this.sponser = [];
    this.event = [];
    this.path = env.imageAddress;
   }

   DeleteData(id, index){
    this.sponserService.DeleteSponser(id).subscribe(res=>{
      this.sponser.splice(index, 1);
    });
    
  

  }

  ngOnInit() {

    this.sponserService.GetSponsers().subscribe(res => {
      console.log("result is ") 
      
      this.sponser = res;
      console.log(this.sponser)
  });

  this.eventService.GetEvents().subscribe(res => {
    console.log("result for event is ") 
    
    this.event = res;
    console.log(this.event)
});
 }

}
