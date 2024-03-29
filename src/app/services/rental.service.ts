import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/SingleResponseModel';
import { RentalDetail } from '../models/rentalDetail';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:7015/api/rentals/";
  constructor(private httpClient:HttpClient) { }
 

  getCheckRentalCars(carId:number, rentDate:Date, returnDate:Date):Observable<ListResponseModel<RentalDetail>>
  {
    let newPath=this.apiUrl+ 'rentaldatecontrol?&carId='+carId+ '&start='+rentDate+'&end='+returnDate;
    return this.httpClient.post<ListResponseModel<RentalDetail>>(newPath,{carId, rentDate, returnDate})
  }
  AddRental(rental:Rental):Observable<ResponseModel>
  {
    let newPath=this.apiUrl+ "add";
    
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

}
//let newPath = this.apiUrl + 'cars/getcarbybrandandcolor?brandId=' + brandId + '&colorId=' + colorId;