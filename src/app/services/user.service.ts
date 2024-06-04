import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/SingleResponseModel';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { UserDetail } from '../models/userDetail';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="https://localhost:7015/api/users/";

  constructor(private httpClient:HttpClient) { }

  getUserById(userId: number): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'getbyid?userId=' + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  getAll():Observable<ListResponseModel<User>>{
    let newPath = this.apiUrl + 'getall'
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  update(user:User,password:string):Observable<ResponseModel>
  {
    let newPath = this.apiUrl + 'edituser?password='+password
    return this.httpClient.post<ResponseModel>(newPath,user)
  }

  delete(user:User):Observable<ResponseModel>
  {
    let newPath = this.apiUrl + 'delete'
    return this.httpClient.post<ResponseModel>(newPath,user)
  }
  getUserDetail():Observable<ListResponseModel<User>>
  {
    let newPath = this.apiUrl + 'getuserdetails'
    return this.httpClient.get<ListResponseModel<User>>(newPath)
  }
  getByEmail(email:string):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + 'email?email='
    return this.httpClient.post<SingleResponseModel<User>>(newPath,email)
  }
  getUserBy(userId:number):Observable<SingleResponseModel<UserDetail>>
  {
    let newPath = this.apiUrl + 'getuserbydetails?id='+userId
    return this.httpClient.get<SingleResponseModel<UserDetail>>(newPath);

  }

  getUserByDetail(userId:number):Observable<SingleResponseModel<User>>
  {
    let newPath="https://localhost:7015/api/auth/getbyid?userId="+userId
    return this.httpClient.get<SingleResponseModel<User>>(newPath);

  }
}
