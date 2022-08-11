import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  REGISTRATIONS_LOCATIONS = '/registration/locations';
  REGISTRATIONS_START = '/registration/start';
  REGISTRATIONS_NEXT = '/registration/{userId}';
  REGISTRATION_SESSION = '/sessions/?site_key=no01';

  constructor(private http: HttpClient) { }

  getLocations(params: any): Observable<any> {
    return this.http.get<any>(this.REGISTRATIONS_LOCATIONS, {params});
  }
  registerStart(data: any): Observable<any> {
    return this.http.post<any>(this.REGISTRATIONS_START, data);
  }
  registerNext(data: any, userId: string): Observable<any> {
    return this.http.post<any>(this.REGISTRATIONS_NEXT.replace('{userId}', userId), data);
  }
  registerSession(data: any): Observable<any> {
    return this.http.post<any>(this.REGISTRATION_SESSION, data);
  }
}
