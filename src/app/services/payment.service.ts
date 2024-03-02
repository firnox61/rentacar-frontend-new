import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl="https://localhost:7015/api/payments/";
  constructor(private httpClient:HttpClient ) { }


makePayment(payment:Payment):Observable<ResponseModel>
{
  let newPath=this.apiUrl+ "add";
    
    return this.httpClient.post<ResponseModel>(newPath,payment);
}

}
