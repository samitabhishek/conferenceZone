import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Event } from '../models/Event';
import { EventService } from '../services/event.service';
import {environment as env} from '../../environments/environment';


@Component({
  selector: 'app-success-ticket',
  templateUrl: './success-ticket.component.html',
  styles: []
})
export class SuccessTicketComponent implements OnInit {
  user: User;
  event: Event;
  path : string;

  constructor(private userService : UserService, private eventService : EventService, private route: ActivatedRoute,) { 
    this.user=new User();
    this.path = env.imageAddress;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.userService.GetUser(id).subscribe(res => {
    
        this.user = res;
        this.eventService.GetEvent(res.event).subscribe(res2 => {
            this.event = res2;
        });
    });

    });
  }

}
