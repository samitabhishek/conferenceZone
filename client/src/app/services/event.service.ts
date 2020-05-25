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
export class EventService {

  headers : HttpHeaders;
  constructor(private client : HttpClient) {
    this.headers = new HttpHeaders({'content-type': 'application/json'});
   }
   GetEvents(): Observable<Event[]>{
     return this.client.get<Event[]>(env.apiAddress+'/event');
   }

   GetEvent(id : string): Observable<Event>{
    return this.client.get<Event>(env.apiAddress+'/event/' + id );
  }
  

  AddEvent(event : Event): Observable<HttpResponse<any>>{
     return this.client.post<HttpResponse<any>>(env.apiAddress + '/event', JSON.stringify(event),
     { headers: this.headers, observe: 'response'} );
   }

   DeleteEvent(id : string):Observable<Event[]>{
     return this.client.delete<Event[]>(env.apiAddress+'/event/'+id);
   }

   UpdateEvent(event : Event): Observable<HttpResponse<any>>{
    return this.client.put<HttpResponse<any>>(env.apiAddress + '/event/' +event._id,
    JSON.stringify(event),{ headers: this.headers, observe: 'response'} );
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

  AddPath(image): Observable<HttpResponse<any>> {
    return this.client.post<HttpResponse<any>>(env.apiAddress + '/file',
    JSON.stringify(image),{headers:this.headers,observe:'response'});
  }
  Addfile(image): Observable<HttpResponse<any>>{
    return this.client.post<HttpResponse<any>>(env.apiAddress + '/file/',image);
   }

}
