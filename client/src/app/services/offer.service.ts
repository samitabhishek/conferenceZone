import { Injectable } from '@angular/core';
import {environment as env} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Event } from '../models/Event';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  headers : HttpHeaders;
  constructor(private client : HttpClient) {
    this.headers = new HttpHeaders({'content-type': 'application/json'});
   }
   GetOffers(): Observable<Offer[]>{
     return this.client.get<Offer[]>(env.apiAddress+'/offer');
   }

   GetOffer(id : string): Observable<Offer>{
    return this.client.get<Offer>(env.apiAddress+'/offer/' + id );
  }

  AdOffer(offer : Offer): Observable<HttpResponse<any>>{
     return this.client.post<HttpResponse<any>>(env.apiAddress + '/offer', JSON.stringify(offer),
     { headers: this.headers, observe: 'response'});
  }
   DeletOffer(id : string):Observable<Offer[]>{
     return this.client.delete<Offer[]>(env.apiAddress+'/offer/'+id);
   }

   UpdatOffer(offer : Offer): Observable<HttpResponse<any>>{
    return this.client.put<HttpResponse<any>>(env.apiAddress + '/offer/' +offer._id,
    JSON.stringify(offer),{ headers: this.headers, observe: 'response'} );
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
