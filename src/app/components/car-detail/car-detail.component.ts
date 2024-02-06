import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetail } from '../../models/carDetail';
import { CarDetailService } from '../../services/car-detail.service';
import { Car } from '../../models/car';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit {

carsDetail:CarDetail[]=[];
carsDetailcar:CarDetail;
dataLoaded=false;
rentals:Rental;
baseUrl="https://localhost:7015/images/";

constructor(private carDetailService:CarDetailService, private activatedRoute:ActivatedRoute,private rentalService:RentalService, private router:Router, private toastrService:ToastrService)
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

navigateToRental() {
 // Kiralama sayfasına yönlendirme
 this.router.navigate(['/rental', this.carsDetailcar.carId]);
}
addToCart(carsDetailcar:CarDetail)
{
  if(carsDetailcar.carId==1)
  {
    this.toastrService.error("Hata","Bu araç kiralanamaz")
  }
  else{
    this.toastrService.success("Kiralanacak araç eklendi",carsDetailcar.carName)
  }
}
// AddRental(rentals:Rental)
// {
//   this.rentalService.AddRental(rentals).subscribe(response=>{
 
//     console.log('Araç başarıyla kiralandı:', response);
//   }
//   )
// }




}