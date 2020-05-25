import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/Event';
import { Offer } from '../../../models/offer';
import { Router } from '@angular/router';
import { SponserService } from 'src/app/services/sponser.service';
import { EventService } from 'src/app/services/event.service';
import { NgForm } from '@angular/forms';
import { Sponser } from 'src/app/models/Sponser';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-sponser',
  templateUrl: './add-sponser.component.html',
  styles: []
})


export class AddSponserComponent implements OnInit {

 
  sponser : Sponser;
  event : Event[];
  
  selectEvent : any[];
  offer : Offer;
  dropdownList = [];  
  selectedItems = [];  
  dropdownSettings:IDropdownSettings;
  file: File;
  url: any;
  
  
  
  

  constructor(private sponserService: SponserService, private router: Router,private eventService: EventService) { 
    this.event=[];
    this.selectEvent=[];
     this.sponser= new Sponser();
     
    
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
      forms.append('file', this.file)

      this.sponserService.AddPath(forms).subscribe(res => {
        this.sponser.imagePath = res.body.filePath;
      })
    
      for (let index = 0; index < this.selectedItems.length; index++) {
        this.selectEvent.push(this.selectedItems[index]._id);
      }
      
      this.sponser.events=this.selectEvent;
      this.sponserService.Addfile(forms).subscribe(res => {
      this.sponserService.AddSponser(this.sponser).subscribe(res => {
      if(res.status == 201) {
        this.router.navigate(['/admin/sponserslist']);      
        
      }
    });
  });
   
   

    

   
  }
}

}
