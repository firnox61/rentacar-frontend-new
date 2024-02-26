import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/SingleResponseModel';

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

  
  // getCheckRentalCar(carId:number,rentDate:Date,returnDate:Date):Observable<boolean>
  // {
  //   let newPath=this.apiUrl+ "rentaldatecontrol";
  //   return this.httpClient.get<boolean>(newPath);
  // }
  //  getCheckRentalCar(carId:number,rentDate:Date,returnDate:Date):Observable<ListResponseModel<Rental>>
  //  {
  //    let newPath=this.apiUrl+ "rentaldatecontrol";
  //    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  //  }
  getCheckRentalCar(carId:number, rentDate:Date, returnDate:Date):Observable<ResponseModel>
  {
    let newPath=this.apiUrl+ "rentaldatecontrol?carId=&rentDate=&returnDate="+carId+rentDate+returnDate;
    return this.httpClient.get<ResponseModel>(this.apiUrl)
  }
  getCheckRentalCars(carId:number, rentDate:Date, returnDate:Date):Observable<ResponseModel>
  {
    let newPath=this.apiUrl+ 'rentaldatecontrol?&carId='+carId+ '&start='+rentDate+'&end='+returnDate;
    //let newPaths=this.apiUrl+ "rentaldatecontrol"//,{carId, rentDate, returnDate};
    //return this.httpClient.post<ResponseModel>('${this.apiUrl}/rentaldatecontrol',{carId, rentDate, returnDate});
    return this.httpClient.post<ResponseModel>(newPath,{carId, rentDate, returnDate})
  }
  AddRental(rental:Rental):Observable<ResponseModel>
  {
    let newPath=this.apiUrl+ "add";
    
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

}
//let newPath = this.apiUrl + 'cars/getcarbybrandandcolor?brandId=' + brandId + '&colorId=' + colorId;