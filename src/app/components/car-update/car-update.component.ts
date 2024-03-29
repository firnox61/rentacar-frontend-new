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
  cars:Car[]=[];
  constructor(private carService:CarService, private toastrService:ToastrService, private formBuilder:FormBuilder,private activatedRoot:ActivatedRoute ){
    
  }

  ngOnInit(): void {
    this.createCarUpdateForm();
    
    
  }

  createCarUpdateForm(){
    this.carUpdateForm=this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      carName:["",Validators.required]
    })
  }

  update()
  {
    if(this.carUpdateForm.valid)
    {
      let carModel=Object.assign({},this.carUpdateForm.value)
      this.carService.add(carModel).subscribe(response=>{
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