import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Color } from '../../models/color';
import { ColorService } from '../../services/color.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrl: './color-update.component.css'
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm:FormGroup;
  colorId:number
  colors:Color;
  dataLoaded=false;
  constructor(private colorService:ColorService, private toastrService:ToastrService, private formBuilder:FormBuilder,private activatedRoot:ActivatedRoute ){
    this.activatedRoot.params.subscribe((params) => {
      this.colorId=+params['colorId']
    });

  }
  ngOnInit(): void {
    this.getColorById(this.colorId);
    this.createColorUpdateForm();
  }
  createColorUpdateForm(){
    this.colorUpdateForm=this.formBuilder.group({
      colorId:[{value:this.colorId, disabled:false},Validators.required],
      colorName:["",Validators.required]
    })
  }
  getColorById(colorId:number)
  {
    this.colorService.getColorById(this.colorId).subscribe(response=>{
      this.colors=response.data;
      this.dataLoaded=true
    })
  }
  update()
  {
   if(this.colorUpdateForm.valid)
   {
    let colorModel=Object.assign({},this.colorUpdateForm.value)
    this.colorService.update(colorModel).subscribe(response=>{
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
