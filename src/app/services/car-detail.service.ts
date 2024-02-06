import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { SingleResponseModel } from '../models/SingleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl="https://localhost:7015/api/";
  constructor(private httpClient:HttpClient) { }

   getCarsDetailByCar(carId:number):Observable<SingleResponseModel<CarDetail>>
    {
      let newPath=this.apiUrl+"cars/getcardetailsid?carId="+carId;
      return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
    
    }

   getCarsDetail():Observable<ListResponseModel<CarDetail>>//senkron gelen metodu http ile talep ettiğimizde asenkron bir işlem olduğundan observable
   {
     let newPath=this.apiUrl+ "cars/getcardetails";
     return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
   }
    // getCarsDetailByCar(carId:number):Observable<ListResponseModel<Car>>
    // {
    //   let newPath=this.apiUrl+"cars/getcardetailsid?carId="+carId;
    //  return this.httpClient.get<ListResponseModel<Car>>(newPath);
    // }
}
