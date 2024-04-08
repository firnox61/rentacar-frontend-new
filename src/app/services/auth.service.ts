import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/SingleResponseModel';
import { RegisterModel } from '../models/registerModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="https://localhost:7015/api/auth/";

  constructor(private httpClient:HttpClient) { }

  login(login:LoginModel)
  {
    let newPath= this.apiUrl+"login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,login);
  }
  register(register:RegisterModel)
  {
    let newPath= this.apiUrl+"register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,register);
  }
  isAuthanticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
}
