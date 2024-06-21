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
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit {
rentalAddForm:FormGroup;
carsDetail:CarDetail[]=[];
carsDetailcar:CarDetail;
dataLoaded=false;
checkRentalCar:FormGroup;
baseUrl="https://localhost:7015/images/";
//baseUrl="C:/Users/Firnox61/source/repos/ReCapProject/WebAPI/wwwroot/Images/";
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
userid=this.authService.getUserDetail();

constructor(private carDetailService:CarDetailService, private activatedRoute:ActivatedRoute
  ,private rentalService:RentalService, private router:Router, private toastrService:ToastrService
  ,private cartService:CartService,private formBuilder:FormBuilder, private authService:AuthService)
{

}

ngOnInit(): void {
this.activatedRoute.params.subscribe((params) => {
  if (params['carId']) {
   // const carId = +params['carId'];
   this.carId=+params['carId']
    this.getCarsDetailByCar(this.carId);//araca tıkladığımızda araç detaylarını gösteriyor
    console.log(this.userid);
    let carId=params['carId'];
    this.createRentalAddForm(carId)
   // this.getCheckRentalCars();
  } else {
    //this.getCheckRentalCars(this.carId,this.rentDate,this.returnDate);
   // this.getCarsDetail();
    //this.AddRental(this.rentals);
  }
  
});
}
createRentalAddForm(carId:string)
{
  this.rentalAddForm=this.formBuilder.group({
    carId:[carId,Validators.required],
    customerId:[this.userid,Validators.required],
    rentDate:["",Validators.required],
    returnDate:["",Validators.required]
  })
}
add()
{
  if(this.rentalAddForm.valid)
    {
      let rentalModel=Object.assign({},this.rentalAddForm.value)
      this.rentalService.AddRental(rentalModel).subscribe(response=>{
        console.log(response);
      })
    }
}

AddRental(): void
{
  const rental: Rental = {
    brandName:this.brandName,
    firstName:this.firstName,
    lastName:this.lastName,
    id:this.id,
    customerId: this.userid,
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
 this.router.navigate(['cars/payment', this.carsDetailcar.carId]);
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
  this.router.navigate(['cars/payment']); // Ödeme sayfasına yönlendirme
}


}