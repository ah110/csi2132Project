import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Booking from './interfaces/booking';
import Renting from './interfaces/renting';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient
  ) { }


  bookRoom(book: Booking): Observable<any> {
    // ==> (POST - url no Back-End): http://locahost:3000/api/booking
    return this.http.post(`${environment.baseUrl}/Booking`, book);
  }

  listAllRoom(): Observable<any> {
    // ==> (GET - Url no Back-End): http://localhost:3000/api/room
    return this.http.get(`${environment.baseUrl}/room`);
  }

  listRoomByName(name: string): Observable<any> {
    // ==> (GET - Url no Back-End): http://localhost:3000/api/room/:name
    return this.http.get(`${environment.baseUrl}/room/${name}`);
  }

  checkInById(book: Booking): Observable<any> {
    return this.http.put(`${environment.baseUrl}/booking/${book.booking_id}`, book);
  }

  rentRoom(rent: Renting): Observable<any> {
    // ==> (DELETE - Url no Back-End): http://localhost:3000/api/renting
    return this.http.post(`${environment.baseUrl}/renting`, rent);
  }
}
