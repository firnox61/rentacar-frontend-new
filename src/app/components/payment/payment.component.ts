import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../models/payment';
import { Subscriber } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  id:Number;
  customerId:Number;
  cardNumber:string;
  expiryMonth: Number;
  expiryYear: Number;
  cvv: string;
  fullName:string;

durum:boolean;



  constructor(private paymentService:PaymentService, private toastrService:ToastrService)
  {

  }


  makePayment(): void {
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

