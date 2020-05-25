import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/Event';
import { Offer } from '../../../models/offer';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';
import { EventService } from 'src/app/services/event.service';
import { NgForm } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styles: []
})
export class AddOfferComponent implements OnInit {

  event : Event[];
  selectEvent : Event[];
  offer : Offer;
  dropdownList = [];  
  selectedItems = [];  
  dropdownSettings:IDropdownSettings;
 
  

  constructor(private offerService: OfferService, private router: Router,private eventService: EventService) { 
    this.event= [];
    this.selectEvent=[];
     this.offer= new Offer();
  }

  ngOnInit() {

    this.eventService.GetEvents().subscribe(res => {
      console.log("result is ") 
      
      this.event = res;
      this.dropdownList=this.event;
      console.log(this.event);

      
  });

  this.dropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 10,
    allowSearchFilter: true
  };
  }
  onItemSelect(item: any) {
    console.log("item : ", item);
    console.log(item.name)
    // this.sponsers.push(item._id)
    console.log(this.event);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  SaveData(form:NgForm){
    if(form.valid) {
     
      const forms = new FormData();
      console.log(this.offer)
      
      for (let index = 0; index < this.selectedItems.length; index++) {
        this.selectEvent.push(this.selectedItems[index]._id);
      }
      console.log(this.selectEvent)
      this.offer.events=this.selectEvent;
     

     this.offerService.AdOffer(this.offer).subscribe(res => {
      if(res.status == 201) {
        this.router.navigate(['/admin/offerslist']);
      }
    })

   
  }
}

}
