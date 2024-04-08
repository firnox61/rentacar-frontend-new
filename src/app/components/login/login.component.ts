import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  
  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService:ToastrService)
  {
  
  }
    
    ngOnInit(): void {
      this.createLoginForm();
    }
  
  
    createLoginForm(){
      this.loginForm=this.formBuilder.group({
        email:["",Validators.required],
        password:["",Validators.required]
      })
    }
    login()
    {
      if(this.loginForm.valid)
        {
          console.log(this.loginForm.value)
          let loginModel=Object.assign({},this.loginForm.value)
          this.authService.login(loginModel).subscribe(response=>{
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
  