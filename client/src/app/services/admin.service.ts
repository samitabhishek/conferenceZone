import { Injectable } from '@angular/core';
import {environment as env} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';
import { Event } from '../models/Event';
import { Sponser } from '../models/Sponser';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  headers : HttpHeaders;
  constructor(private client : HttpClient) {
    this.headers = new HttpHeaders({'content-type': 'application/json'});
   }
   GetAdmins(): Observable<Admin[]>{
     return this.client.get<Admin[]>(env.apiAddress+'/admin');
   }

  //  GetAdmin(admin : Admin): Observable<Admin>{
  //   return this.client.get<Admin>(env.apiAddress+'/admin/login');
  // }

  GetAdmin(admin : Admin): Observable<HttpResponse<any>>{
     return this.client.post<HttpResponse<any>>(env.apiAddress + '/admin/login', JSON.stringify(admin),
     { headers: this.headers, observe: 'response'} );
   }
   ValidateAdmin(admin:Admin):Observable<HttpResponse<any>>{
    console.log('inside validate admin');
    return this.client.post<HttpResponse<any>>(env.apiAddress + '/admin/login',
    JSON.stringify(admin),{headers:this.headers,observe:'response'});
  }

   DeleteAdmin(id : string):Observable<Admin[]>{
     return this.client.delete<Admin[]>(env.apiAddress+'/admin/'+id);
   }

   UpdateAdminr(admin : Admin): Observable<HttpResponse<any>>{
    return this.client.put<HttpResponse<any>>(env.apiAddress + '/admin/' +admin._id,
    JSON.stringify(admin),{ headers: this.headers, observe: 'response'} );
  }
  
}
