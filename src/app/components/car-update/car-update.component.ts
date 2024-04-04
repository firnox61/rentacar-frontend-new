import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../models/car';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrl: './car-update.component.css'
})
export class CarUpdateComponent implements OnInit{
  carUpdateForm:FormGroup
  addd:string
  cars:Car;
  dataLoaded=false;
  carId: number;
  constructor(private carService:CarService, private toastrService:ToastrService, private formBuilder:FormBuilder,private activatedRoot:ActivatedRoute ){
    this.activatedRoot.params.subscribe((params) => {
      this.carId=+params['carId']
    });
  }

  ngOnInit(): void {
   
      this.getCarById(this.carId);
      this.createCarUpdateForm();

 
    // this.createCarUpdateForm();
    // this.getCarById(this.carId);
    
  }

  createCarUpdateForm(){
    this.carUpdateForm=this.formBuilder.group({
      carId: [{value: this.carId, disabled: false}, Validators.required],
     // carId:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      carName:["",Validators.required],

    })
  }
  getCarById(carId:number)
  {
    this.carService.getCarsById(carId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
      // Burada this.carUpdateForm'u doldurabilirsiniz
      // Örneğin:
     /* this.carUpdateForm.patchValue({
        carId: this.cars[0].carId,
        brandId: this.cars[0].brandId,
        colorId: this.cars[0].colorId,
        modelYear: this.cars[0].modelYear,
        dailyPrice: this.cars[0].dailyPrice,
        carName: this.cars[0].carName
      });*/
    });
  }

  update()
  {
    if(this.carUpdateForm.valid)
    {
      let carModel=Object.assign({},this.carUpdateForm.value)
      this.carService.update(carModel).subscribe(response=>{
        console.log(response)
        this.toastrService.success(response.message,"Başarılı")
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