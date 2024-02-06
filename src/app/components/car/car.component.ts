import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { CarDetail } from '../../models/carDetail';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../services/brand.service';
import { ColorService } from '../../services/color.service';
import { Brand } from '../../models/brand';
import { Color } from '../../models/color';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit {
  cars:Car[]=[];
  dataLoaded=false;
  currentCar:Car;
  baseUrl="https://localhost:7015/images/";
  filterText="";
  brands:Brand[]=[];
  colors:Color[]=[];
  selectBrand:string;
  selectColor:string;
  currentBrand:Brand;
  //carsDetail:CarDetail[];


  constructor(private carService:CarService, private activatedRoute:ActivatedRoute
    , private router:Router, private brandService:BrandService, private colorService:ColorService)
{

}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }
    
      else{
        this.getCars();
        this.getBrands();
        this.getColors();
      }
    })
    //this.getCarsDetail();
  }
  getBrands()
  {
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
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
  getColors()
  {
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
      this.dataLoaded=true;
    })
  }
  getCars()
  {
    this.carService.getCars().subscribe(Response=>{
      this.cars=Response.data;
      this.dataLoaded=true;
    })
  }
  getCarsByBrandAndColor(brandName:string,colorName:string)
  {
    this.carService.getCarsByBrandAndColor(brandName,colorName).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }
  // getCarsById(carId:number)
  // {
  //   this.carService.getCarsById(carId).subscribe(response=>{
  //     this.cars=response.data;
  //     this.dataLoaded=true;
  //   })
  // }
  
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

  setCurrentCar(car:Car){
    this.currentCar=car;
    this.router.navigate(['/cars',car.carId]);
    
  }
  getCurrentCarClass(car:Car){
    if(car==this.currentCar){
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }
  getAllCarClass()
  {
    if(!this.currentCar)
    {
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }
  


}

