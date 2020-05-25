import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/Event';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { NgForm } from '@angular/forms';
import { Sponser } from '../../../models/Sponser';
import { SponserService } from 'src/app/services/sponser.service';
import { OfferService } from 'src/app/services/offer.service';
import { Offer } from 'src/app/models/offer';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styles: []
})
export class EditEventComponent implements OnInit {


  event : Event;
  speakers: string[];
  sponsers: string[];
  sponsersList: Sponser[];
  offersList: Offer[];
  offers: string[];
  temp_speaker: string;
  dropdownList = [];
  dropdownList2 = [];
  selectedItems = [];
  selectedItems2 = [];
  dropdownSettings:IDropdownSettings;
  dropdownSettings2:IDropdownSettings;
  

  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute, private sponserService: SponserService, private offerService: OfferService) { 
    this.event= new Event();
    this.speakers=[];
    this.sponsers=[];
    this.offers=[];
    this.sponsersList=[];
    this.temp_speaker='';
  }

  ngOnInit() {

    
    
    this.sponserService.GetSponsers().subscribe(res => {
      console.log("result is ") 
      
      this.sponsersList = res;
      this.dropdownList=this.sponsersList;
      console.log(this.sponsersList);
           
  });

  this.offerService.GetOffers().subscribe(res => {
    console.log("result is ") 
    
    this.offersList = res;
    this.dropdownList2=this.offersList;
    console.log(this.offersList);

    
});

  console.log("3");
     

    
   
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.dropdownSettings2 = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.route.params.subscribe(params => {
      const id = params.id;
      
      this.eventService.GetEvent(id).subscribe(res => {
        this.event = res;
        this.speakers=this.event.speakers;
        for(let i of this.event.sponsers){
        this.sponserService.GetSponser(i).subscribe(res => {
          this.selectedItems=[...this.selectedItems,res];

        });
      }
      for(let i of this.event.offers){
        this.offerService.GetOffer(i).subscribe(res => {
          this.selectedItems2=[...this.selectedItems2,res];

        });
      }
        // this.selectedItems=this.event.sponsers;
        // this.selectedItems2=this.event.offers;
        // console.log("event offer"+this.event.offers)
        
      });
    });
  }
  DeleteSpeaker(item){
    console.log("item received is "+item);
    for(let i =0 ;i<this.speakers.length;i++){
      if(this.speakers[i]==item){
        this.speakers.splice(i,1);
        break;
      }
    }
  
  }

  onItemSelect(item: any) {
    console.log("item : ", item);
    console.log(item.name)
    // this.sponsers.push(item._id)
    console.log(this.sponsers);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onItemSelect2(item: any) {
    console.log("item : ", item);
    console.log(item.name)
    // this.sponsers.push(item._id)
    console.log(this.sponsers);
  }
  onSelectAll2(items: any) {
    console.log(items);
  }



  AddSpeaker(){
      this.speakers.push(this.temp_speaker);
      this.temp_speaker='';
      console.log(this.speakers)
  }

  SaveData(form:NgForm){
    if(form.valid) {
      
      const forms = new FormData();
      console.log(this.event)

      for (let index = 0; index < this.selectedItems.length; index++) {
        this.sponsers.push(this.selectedItems[index]._id);
      }
      console.log(this.sponsers)
      this.event.speakers=this.speakers;
      this.event.sponsers=this.sponsers;
      for (let index = 0; index < this.selectedItems2.length; index++) {
        this.offers.push(this.selectedItems2[index]._id);
      }
      this.event.offers=this.offers;
   

  
   
    
  

    this.eventService.UpdateEvent(this.event).subscribe(res => {
      if(res.status == 201) {
        this.router.navigate(['/admin/eventlist']);
      }
    })

   
  }
}

}
