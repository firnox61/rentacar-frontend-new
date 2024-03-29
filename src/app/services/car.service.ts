import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
apiUrl="https://localhost:7015/api/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>
  {
    let newPath=this.apiUrl+ "cars/getall";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsById(carId:number):Observable<ListResponseModel<Car>>
  {
    let newPath=this.apiUrl+ "cars/getbyid?id=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>
  {
    let newPath=this.apiUrl+"cars/getbybrand?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>
  {
    let newPath=this.apiUrl+"cars/getbycolor?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrandAndColor(brandName:string,colorName:string):Observable<ListResponseModel<Car>>
  {
    let newPath=this.apiUrl+"cars/getcarbybrandandcolor?brandName=" + brandName + "&colorName=" + colorName;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
  }

  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car)
  }

}
