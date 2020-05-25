import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/Event';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { NgForm } from '@angular/forms';
import { Sponser } from '../../../models/Sponser';
import { SponserService } from 'src/app/services/sponser.service';
import { OfferService } from 'src/app/services/offer.service';
import { Offer } from 'src/app/models/offer';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styles: []
})
export class AddEventComponent implements OnInit {

  event : Event;
  speakers: string[];
  topics:string[];
  sponsers: string[];
  sponsersList: Sponser[];
  offersList: Offer[];
  offers: string[];
  temp_speaker: string;
  temp_topic:string;
  dropdownList = [];
  dropdownList2 = [];
  selectedItems = [];
  selectedItems2 = [];
  dropdownSettings:IDropdownSettings;
  dropdownSettings2:IDropdownSettings;
  file: File;
  url: any;
  temp_date:string;
  date_err:string;
  err_speaker:string;
  

  constructor(private eventService: EventService, private router: Router, private sponserService: SponserService, private offerService: OfferService, private datePipe : DatePipe) { 
    this.event= new Event();
    this.speakers=[];
    this.topics=[];
    this.sponsers=[];
    this.offers=[];
    this.sponsersList=[];
    this.temp_speaker='';
    this.temp_topic='';
    this.date_err='';
    this.err_speaker='';

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
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }
DeleteSpeaker(i){
  console.log("item received is "+i);
  {
      this.topics.splice(i,1);
      this.speakers.splice(i,1);
    
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

DateValidate(){
  let date = new Date();
  let today_date=parseInt(this.datePipe.transform(date,"yyyyMMdd"));
  let selected_date=parseInt(this.datePipe.transform(this.temp_date,"yyyyMMdd"));
  
  if(selected_date>=today_date){
    this.date_err='';
    this.event.date=this.temp_date
  }else{
    console.log("wrong date")
    this.date_err="Event Date cannot be before today"
    console.log(this.date_err);

  }
 

}

  AddSpeaker(){

      this.speakers.push(this.temp_speaker);
      this.temp_speaker='';
      this.topics.push(this.temp_topic);
      this.temp_topic='';
      // console.log(this.speakers)
  }

  SaveData(form:NgForm){
    if(form.valid) {
      
      const forms = new FormData();
      forms.append('file', this.file)
      console.log(this.event)

      this.eventService.AddPath(forms).subscribe(res => {
        this.event.imagePath = res.body.filePath;
      })

      for (let index = 0; index < this.selectedItems.length; index++) {
        this.sponsers.push(this.selectedItems[index]._id);
      }
      console.log(this.sponsers)
      this.event.speakers=this.speakers;
      this.event.topics=this.topics
      this.event.sponsers=this.sponsers;
      for (let index = 0; index < this.selectedItems2.length; index++) {
        this.offers.push(this.selectedItems2[index]._id);
      }
      this.event.offers=this.offers;
   

  
      this.eventService.Addfile(forms).subscribe(res => {

    this.eventService.AddEvent(this.event).subscribe(res => {
      if(res.status == 201) {
        this.router.navigate(['/admin/eventlist']);
      }
    });
  })
      

   
  }
}

}
