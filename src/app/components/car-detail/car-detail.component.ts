import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetail } from '../../models/carDetail';
import { CarDetailService } from '../../services/car-detail.service';
import { Car } from '../../models/car';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit {

carsDetail:CarDetail[]=[];
carsDetailcar:CarDetail;
dataLoaded=false;
checkRentalCar:FormGroup;
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
  ,private cartService:CartService,private formBuilder:FormBuilder)
{

}

ngOnInit(): void {
this.activatedRoute.params.subscribe((params) => {
  if (params['carId']) {
   // const carId = +params['carId'];
   this.carId=+params['carId']
    this.getCarsDetailByCar(this.carId);//araca tıkladığımızda araç detaylarını gösteriyor
   // this.getCheckRentalCars();
  } else {
    //this.getCheckRentalCars(this.carId,this.rentDate,this.returnDate);
   // this.getCarsDetail();
    //this.AddRental(this.rentals);
  }
  
});
}


AddRental(): void
{
  const rental: Rental = {
    brandName:this.brandName,
   firstName:this.firstName,
    lastName:this.lastName,
    id:this.id,
    customerId: this.customerId,
    carId: this.carsDetailcar.carId,
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
// createCheckRentalCar()
// {
// this.checkRentalCar=this.formBuilder.group({
//   carId:["",Validators.required],
//   rentDate:["",Validators.required],
//   returnDate:["",Validators.required]
// })
// }
// getCheckRentalCars()
// {
//   if(this.checkRentalCar.valid)
//   {
//     let rentalModel=Object.assign({},this.checkRentalCar.value)
//     this.rentalService.getCheckRentalCars(rentalModel).subscribe(response=>{
//       console.log(response)
//     })
//   }
// }

  getCheckRentalCars()
 {

  //carId==this.carsDetailcar.carId;
    this.rentalService.getCheckRentalCars(this.carId ,this.rentDate,this.returnDate).subscribe(response=>{

    this.durum=response.success;
    console.log(response)
    if (this.durum) {
      this.toastrService.success('Araç kiralanabilir durumda', 'Başarılı');
    } else {
      this.toastrService.error('Bu araç kiralanamaz', 'Hata');
    }
   
  //  if (this.durum==false) {
  //    this.toastrService.error("Hata","Bu araç kiralanamaz");
  //  } else {
  //    this.toastrService.success("Araç kiralanabilir durumda");
  //   // this.navigateToRental();
  //  }
   },error => {
    // Hata durumunda çalışacak işlemler
    console.error('Bir hata oluştu:', error);
    // Örneğin, hata olduğunda bir hata mesajı gösterebilirsiniz
    this.toastrService.error('Bir hata oluştu', 'Hata');
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