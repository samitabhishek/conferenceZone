import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Event } from '../models/Event';
import { Offer } from '../models/offer';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EventService } from '../services/event.service';
import { OfferService } from '../services/offer.service';
import {environment as env} from '../../environments/environment';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styles: []
})
export class UserRegistrationComponent implements OnInit {

  user: User;
  amountPaid: any;
  event: Event;
  selectedoffer: string;
  offer: Offer;
  offerArray: Offer[];
  tempAmount: string;
  offerApplied: boolean;
  path:string;
  

  constructor(private userService : UserService,private router:Router, private route: ActivatedRoute,private eventService : EventService,private offerService : OfferService) {
    this.user=new User();
    this.amountPaid='';
    this.selectedoffer='';
    this.offerArray=[];
    this.offerApplied=false;
    this.path = env.imageAddress;
   }

   SaveData(form:NgForm){
    if(form.valid) {
      
      const forms = new FormData();
      this.user.event=this.event._id;
      this.user.amountPaid=this.amountPaid;
      this.userService.AddUser(this.user).subscribe(res => {
      if(res.status == 201) {
        this.router.navigate(['/success',res.body._id]);      
        
      }
    });   
  }
}
Discount(){
  if(this.selectedoffer==='0'){
    this.offerApplied=false;
  }else{
    this.offerApplied=true;
  }
  this.amountPaid=this.tempAmount;
  console.log("selected id "+this.selectedoffer)
  this.offerService.GetOffer(this.selectedoffer).subscribe(res => {
    this.offer = res;
    this.amountPaid=(this.amountPaid)-(this.offer.amount);
  
    
  });


}

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      const id = params.id;
      this.user.event=params.id
      this.eventService.GetEvent(id).subscribe(res => {
        this.event = res;
        // console.log("event offer"+this.event.offers)
        this.amountPaid=this.event.price;
        this.tempAmount=this.event.price;
      });
    });
    this.offerService.GetOffers().subscribe(res => {
      console.log("result is ") 
      console.log(res);
      this.offerArray = res;
  });

    
    
  }

}
