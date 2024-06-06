import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetail } from '../../models/carDetail';
import { CarDetailService } from '../../services/car-detail.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Brand } from '../../models/brand';
import { Color } from '../../models/color';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit {
  cars:Car[]=[];
  carsDetail:CarDetail[]=[];
  carsColorBrand:CarDetail[]=[];
  carsDetailcar:CarDetail;
  dataLoaded=false;
  baseUrl="https://localhost:7015/images/";
  filterCarDetailText="";
  brands:Brand[]=[];
  colors:Color[]=[];
  selectBrand:string;
  selectColor:string;
  currentBrand:Brand;
  constructor(private carDetailService:CarDetailService,private activatedRoute:ActivatedRoute
    , private router:Router, private toastrService:ToastrService, private formBuilder:FormBuilder, private carService:CarService){

  }
  ngOnInit(): void {
    this.getCarsDetails();
   /* this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }
    
      else{
    this.getCarsDetails();
      }*/
  }
  
  getCarsByBrand(brandId:number)
  {
      this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }
  getCarsByColor(colorId:number)
  {
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }
  
  updateSelectedBrand(brand:Brand): void {
    this.selectBrand = brand.brandName;
  }

  updateSelectedColor(color:Color): void {
    this.selectColor = color.colorName;
  }
  clearfilter()
  {
    this.selectBrand="";
    this.selectColor="";
  }
  getCarsByBrandAndColor(brandName:string,colorName:string)
  {
    this.carDetailService.getCarsByBrandAndColor(brandName,colorName).subscribe(response=>{
      this.carsColorBrand=response.data;
      this.dataLoaded=true;
    })
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
    if(response.data.length===0)
      {
        this.toastrService.warning('Uygun araç bulunamamıştır', 'Arama Sonucu');
      }
      else{
        this.carsDetail=response.data;
        this.dataLoaded=true;
        this.toastrService.info('Uygun araçlar');
      }

  })
}

carUpdate(car:Car)
 {
   this.router.navigate(['/cars/carlist/update',car.carId]); 
 }
 carDelete(carDetail:CarDetail)
 {
  this.carService.delete(carDetail).subscribe(response=>{
    this.toastrService.success(response.message,"Silme Başarılı")
  })
 }
 carAdd()
 {
   this.router.navigate(['cars/carlist/add']); 
 }

}
