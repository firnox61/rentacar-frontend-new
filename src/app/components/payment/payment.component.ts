import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../models/payment';
import { Subscriber } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  id:Number;
  customerId:Number;
  cardNumber:string;
  expiryMonth: Number;
  expiryYear: Number;
  cvv: string;
  fullName:string;
paymentAddForm:FormGroup
durum:boolean;



  constructor(private paymentService:PaymentService, private toastrService:ToastrService,private formBuilder:FormBuilder,private activatedRoot:ActivatedRoute)
  {

  }
  ngOnInit(): void {
   this.createPaymentAddForm();
  }

  createPaymentAddForm(){
    this.paymentAddForm=this.formBuilder.group({
      id:["",Validators.required],
      customerId:["",Validators.required],
      cardNumber:["",Validators.required],
      expiryMonth:["",Validators.required],
      expiryYear:["",Validators.required],
      cvv:["",Validators.required],
      fullName:["",Validators.required]
    })
  }
  add()
  {
    if(this.paymentAddForm.valid)
      {
        let paymentModel=Object.assign({},this.paymentAddForm.value)
        this.paymentService.add(paymentModel).subscribe(response=>{
          console.log(response)
          this.toastrService.success(response.message,"Kiralama  işlemi başarılı bir şekilde tamamlandı !!!")
        },responseError=>{
          if(responseError.error.Errors.length>0){
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
              
            }
          }
        })
      }
      else{
        this.toastrService.error("Form Eksik","Dikkat")
      }
    }




}


 /* makePayment(): void {
    const payment:Payment = {
      id:this.id,
      customerId:this.customerId,
      cardNumber: this.cardNumber,
      expiryMonth: this.expiryMonth,
      expiryYear: this.expiryYear,
      cvv: this.cvv,
      fullName: this.fullName
    };

    // Ödeme servisini kullanarak ödeme işlemini gerçekleştir
    this.paymentService.makePayment(payment).subscribe(response => {
      this.durum=response.success
      if (this.durum==false) {
        this.toastrService.error("Hata","Kart işlemlerini kontrol ediniz!!!");
      } else {
        this.toastrService.success("Kiralama  işlemi başarılı bir şekilde tamamlandı !!!");
       // this.navigateToRental();
      }
      // Ödeme işlemi başarılıysa burada gerekli işlemleri yapabilirsiniz

      console.log('Ödeme başarıyla gerçekleştirildi.', response);
    }, error => {
      // Ödeme işlemi başarısız olduğunda burada hata işlemlerini yapabilirsiniz
      console.error('Ödeme işlemi başarısız:', error);
    });
  }
}

*/