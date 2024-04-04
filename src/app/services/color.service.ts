import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/SingleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl="https://localhost:7015/api/colors/";
  constructor(private httpClient:HttpClient ) { }

  getColors():Observable<ListResponseModel<Color>>
  {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+"getall");
  }
  getColorById(colorId:number):Observable<SingleResponseModel<Color>>
{
  let newPath=this.apiUrl+ "getbyid?colorid=" + colorId;
  return this.httpClient.get<SingleResponseModel<Color>>(newPath)
}
  add(color:Color):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiUrl+"add",color)
  }
  update(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",color)
  }

}
