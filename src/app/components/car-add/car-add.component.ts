import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrl: './car-add.component.css'
})
export class CarAddComponent implements OnInit{
  carAddForm:FormGroup
  addd:string
  constructor(private carService:CarService, private toastrService:ToastrService, private formBuilder:FormBuilder,private activatedRoot:ActivatedRoute ){
    
  }
  ngOnInit(): void {
    this.createCarAddForm();
    
    
  }

  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      carName:["",Validators.required],
      minFindexPoint:["",Validators.required]
    })
  }

  add()
  {
    if(this.carAddForm.valid)
    {
      let carModel=Object.assign({},this.carAddForm.value)
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
