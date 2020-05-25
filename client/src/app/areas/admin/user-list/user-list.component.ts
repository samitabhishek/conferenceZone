import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Event } from 'src/app/models/Event';
import { UserService } from '../../../services/user.service';
import {environment as env} from '../../../../environments/environment';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {

  user : User[];
  event : Event[];
// path : string;
  constructor(private userService : UserService,private eventService : EventService) {
    this.user = [];
    this.event = [];
    // this.path = env.imageAddress;
   }

   DeleteData(id, index){
    this.userService.DeleteUser(id).subscribe(res=>{
      this.user.splice(index, 1);
    });
    
  

  }

  ngOnInit() {
   
    this.userService.GetUsers().subscribe(res => {
      console.log("result is ") 
      console.log(res);
      this.user = res;
  });
    this.eventService.GetEvents().subscribe(res => {
      this.event=res;

    });
 }
}
