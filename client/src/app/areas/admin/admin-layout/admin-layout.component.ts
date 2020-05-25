import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styles: []
})
export class AdminLayoutComponent implements OnInit {
  admin : Admin;

  constructor(private router : Router) { 
    
  }
  logout() {
    localStorage.removeItem('admin');
    this.router.navigate(['/login']);
  }

  ngOnInit() {

    this.admin = JSON.parse(localStorage.getItem('admin'));
    if(this.admin == null){
      this.router.navigate(['/login']);
    }
   
  }

}
