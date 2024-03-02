import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetail } from '../../models/carDetail';
import { CarDetailService } from '../../services/car-detail.service';
import { Car } from '../../models/car';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit {

carsDetail:CarDetail[]=[];
carsDetailcar:CarDetail;
dataLoaded=false;

baseUrl="https://localhost:7015/images/";
durum:Boolean;
rentDate:Date;
returnDate:Date;
carId:number;
carsRentDate:Rental;
kiralanabilir: boolean;
customerId:number;
id:number;
brandName:string;
firstName:string;
lastName:string;

constructor(private carDetailService:CarDetailService, private activatedRoute:ActivatedRoute
  ,private rentalService:RentalService, private router:Router, private toastrService:ToastrService
  ,private cartService:CartService)
{

}

ngOnInit(): void {
this.activatedRoute.params.subscribe((params) => {
  if (params['carId']) {
    const carId = +params['carId'];
    this.getCarsDetailByCar(carId);//araca tıkladığımızda araç detaylarını gösteriyor
  } else {
   // this.getCarsDetail();
  //  this.AddRental(this.rentals);
  }
});
}

// getCheckRentalCar()
// {
  
//   this.rentalService.getCheckRentalCar(this.carId,this.rentDate,this.returnDate).subscribe(response=>{
// this.kiralanabilir=response;
// this.toastrService.success("Araç kiralanabilir durumda");

//   })
// }
AddRental(): void
{
  const rental: Rental = {
    brandName:this.brandName,
   firstName:this.firstName,
    lastName:this.lastName,
    id:this.id,
    customerId: this.customerId,
    carId: this.carId,
    rentDate: this.rentDate,
    returnDate: this.returnDate
  };
  this.rentalService.AddRental(rental).subscribe(response=>{
    this.durum=response.success;

    if (this.durum==false) {
     this.toastrService.error("Hata","Bu araç kiralanamaz");
   } else {
     this.toastrService.success("Araç kiralanabilir durumda");
    // this.navigateToRental();
   }
  })
}
 getCheckRentalCars()
 {
   this.rentalService.getCheckRentalCars(this.carId,this.rentDate,this.returnDate).subscribe(response=>{
   //this.carsRentDate=response.data;
   this.durum=response.success;

   if (this.durum==false) {
    this.toastrService.error("Hata","Bu araç kiralanamaz");
  } else {
    this.toastrService.success("Araç kiralanabilir durumda");
   // this.navigateToRental();
  }
  });
 }
getCarsDetailByCar(carId:number)
{
this.carDetailService.getCarsDetailByCar(carId).subscribe(response=>{
  this.carsDetailcar=response.data;
  this.dataLoaded=true;
})
}

getCarsDetail()
{
this.carDetailService.getCarsDetail().subscribe(response=>{
  this.carsDetail=response.data;
  this.dataLoaded=true;
})
}

navigateToRental():void {
 // Kiralama sayfasına yönlendirme
 this.router.navigate(['/payment', this.carsDetailcar.carId]);
}
addToCart(carsDetailcar:CarDetail)
{
  if(carsDetailcar.carId==5)
  {
    this.toastrService.error("Hata","Bu araç kiralanamaz")
  }
  else{
    this.toastrService.success("Kiralanacak araç eklendi",carsDetailcar.carName);
    this.cartService.addToCart(carsDetailcar);
  }
}
kirala(): void {
  // Kiralama işlemi burada gerçekleştirilir
  this.router.navigate(['/payment']); // Ödeme sayfasına yönlendirme
}


}