import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:7015/api/rentals/";
  constructor(private httpClient:HttpClient) { }
  // getRentalsDetail():Observable<ListResponseModel<Rental>>
  // {
  //   return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl)
  // }
  AddRental(rental:Rental):Observable<ResponseModel>
  {
    let newPath=this.apiUrl+ "add";
    
    return this.httpClient.post<ResponseModel>(this.apiUrl,rental);
  }
}
