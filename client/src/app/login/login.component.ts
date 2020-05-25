import { Component, OnInit } from '@angular/core';
import {AdminService} from '../services/admin.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Admin } from '../models/admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  admin : Admin;
  admin1 : Admin;
  error: string;

  constructor(private adminService : AdminService,private router: Router) {
    this.admin=new Admin();
    this.admin1=new Admin();
    this.error="";

   }


  SaveData(form:NgForm){
    if(form.valid) {
      console.log("admin received"+this.admin);
      this.adminService.ValidateAdmin(this.admin).subscribe(res => {
          if(res.status===200 && res.body!=null) {
              
              console.log("res received is "+res.body);
              localStorage.setItem('admin',JSON.stringify(res.body));
              this.router.navigate(['/admin']);
          } else{
           
            this.error="Invalid Credentials";
          }
        
      });   
  }
}

  ngOnInit() {
    this.admin1 = JSON.parse(localStorage.getItem('admin'));
     if(this.admin1 != null) {
        this.router.navigate(['/admin']);
     }
  }

}
