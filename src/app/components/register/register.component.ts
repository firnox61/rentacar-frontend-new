import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  implements OnInit {

  registerForm:FormGroup;
  
  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService:ToastrService)
  {
  
  }
    
    ngOnInit(): void {
      this.createRegisterForm();
    }

    createRegisterForm(){
      this.registerForm=this.formBuilder.group({
        email:["",Validators.required],
        password:["",Validators.required],
        firstName:["",Validators.required],
        lastName:["",Validators.required]

      })
    }
    register()
    {
    if(this.registerForm.valid)
      {
        console.log(this.registerForm.value)
        let registerModel=Object.assign({},this.registerForm.value)
        this.authService.register(registerModel).subscribe(response=>{
          //console.log(response)
          this.toastrService.info(response.message)
          localStorage.setItem("token",response.data.token)
        },responseError=>{
          // if(responseError.error.Errors.length>0){
          //   for (let i = 0; i < responseError.error.Errors.length; i++) {
          //     this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Parola veya mail hatası")
              
          //   }
           
          // }
          this.toastrService.error(responseError.error)
          
        })
        
      }
      else{
        this.toastrService.error("Form eksik","Dikkat")
      }
    }
}
