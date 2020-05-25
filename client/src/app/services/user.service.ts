import { Injectable } from '@angular/core';
import {environment as env} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Event } from '../models/Event';
import { Sponser } from '../models/Sponser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers : HttpHeaders;
  constructor(private client : HttpClient) {
    this.headers = new HttpHeaders({'content-type': 'application/json'});
   }
   GetUsers(): Observable<User[]>{
     return this.client.get<User[]>(env.apiAddress+'/user');
   }

   GetUser(id : string): Observable<User>{
    return this.client.get<User>(env.apiAddress+'/user/' + id );
  }

  AddUser(user : User): Observable<HttpResponse<any>>{
     return this.client.post<HttpResponse<any>>(env.apiAddress + '/user', JSON.stringify(user),
     { headers: this.headers, observe: 'response'} );
   }

   DeleteUser(id : string):Observable<User[]>{
     return this.client.delete<User[]>(env.apiAddress+'/user/'+id);
   }

   UpdateUser(user : User): Observable<HttpResponse<any>>{
    return this.client.put<HttpResponse<any>>(env.apiAddress + '/user/' +user._id,
    JSON.stringify(user),{ headers: this.headers, observe: 'response'} );
  }
  
  // LoginUser(user : Login): Observable<HttpResponse<any>>{
  //   console.log("39 userservice")
  //   return this.client.post<HttpResponse<any>>(env.apiAddress + '/user/login', JSON.stringify(user),
  //   { headers: this.headers, observe: 'response'} );
  // }

  // AddProfessional(user : Professional): Observable<HttpResponse<any>>{
  //   return this.client.post<HttpResponse<any>>(env.apiAddress + '/professional', JSON.stringify(user),
  //   { headers: this.headers, observe: 'response'} );
  // }

  // GetProfessional(): Observable<Professional[]>{
  //   return this.client.get<Professional[]>(env.apiAddress + '/professional');
  // }

  // AddPath(image): Observable<HttpResponse<any>> {
  //   return this.client.post<HttpResponse<any>>(env.apiAddress + '/file',
  //   JSON.stringify(image),{headers:this.headers,observe:'response'});
  // }
  // Addfile(image): Observable<HttpResponse<any>>{
  //   return this.client.post<HttpResponse<any>>(env.apiAddress + '/file/',image);
  //  }

}
