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
export class SponserService {

  headers : HttpHeaders;
  constructor(private client : HttpClient) {
    this.headers = new HttpHeaders({'content-type': 'application/json'});
   }
   GetSponsers(): Observable<Sponser[]>{
     return this.client.get<Sponser[]>(env.apiAddress+'/sponser');
   }

   GetSponser(id : string): Observable<Sponser>{
    return this.client.get<Sponser>(env.apiAddress+'/sponser/' + id );
  }

  AddSponser(sponser : Sponser): Observable<any>{
    // AddSponser(sponser : Sponser): Observable<any>{
     return this.client.post<any>(env.apiAddress + '/sponser', JSON.stringify(sponser),
     { headers: this.headers, observe: 'response'} );
   }

   DeleteSponser(id : string):Observable<Sponser[]>{
     return this.client.delete<Sponser[]>(env.apiAddress+'/sponser/'+id);
   }

   UpdateSponser(sponser : Sponser): Observable<HttpResponse<any>>{
    return this.client.put<HttpResponse<any>>(env.apiAddress + '/sponser/' +sponser._id,
    JSON.stringify(sponser),{ headers: this.headers, observe: 'response'} );
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
