import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetail } from '../../models/carDetail';
import { CarDetailService } from '../../services/car-detail.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit {
  cars:Car[]=[];
  carsDetail:CarDetail[]=[];
  carsDetailcar:CarDetail;
  dataLoaded=false;
  baseUrl="https://localhost:7015/images/";
  constructor(private carDetailService:CarDetailService,private activatedRoute:ActivatedRoute
    , private router:Router, private toastrService:ToastrService, private formBuilder:FormBuilder){

  }
  ngOnInit(): void {
    this.getCarsDetails();
  }
  getCarsDetailByCar(carId:number)
  {
  this.carDetailService.getCarsDetailByCar(carId).subscribe(response=>{
    this.carsDetailcar=response.data;
    this.dataLoaded=true;
  })
  }

  getCarsDetails()
{
  this.carDetailService.getCarsDetail().subscribe(response=>{
    this.carsDetail=response.data;
    this.dataLoaded=true;
  })
}

carUpdate(car:Car)
 {
   this.router.navigate(['/cars/carlist/update',car.carId]); 
 }
 carDelete(car:Car)
 {
  this.router.navigate(['/cars/carlist/delete',car.carId]);
 }
 carAdd()
 {
   this.router.navigate(['cars/carlist/add']); 
 }

}
