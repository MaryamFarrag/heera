import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  API_KEY = 'AIzaSyBqQOEssdDUloy0dpcsf4N3AVnZWD2tfno';

  constructor(public http: HttpClient) {}
   getPlaces(val){
     return this.http.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=${this.API_KEY}`);
   }

}
