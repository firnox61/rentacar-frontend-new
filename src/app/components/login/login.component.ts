import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { Token } from '@angular/compiler';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  userInfos: User;
  Token:string;
  emailForm:FormGroup;
  
  constructor(private formBuilder:FormBuilder, private authService:AuthService, 
    private toastrService:ToastrService, private localStorage:LocaleStorageService
    , private userService:UserService, private router:Router)
  {
  
  }
    
    ngOnInit(): void {
      this.createLoginForm();
     // this.userInfo();
     this.createEmailForm();
    }

    createEmailForm(){
      this.emailForm=this.formBuilder.group({
        email:["",Validators.required]
      })
    }


  userInfo()
  {
    const token=this.localStorage.getItem("token")
    this.authService.getUserInfo(token).subscribe(response=>{
      this.userInfos=response.data
      console.log(token)
    },(error) => {
      console.error('Kullanıcı bilgileri alınamadı:', error);
    })
  }
  
    createLoginForm(){
      this.loginForm=this.formBuilder.group({
        email:["",Validators.required],
        password:["",Validators.required]
      })
    }
    human()
    {
      let result=this.userService.getUserById
    }
    logOut()
    {
      this.localStorage.remove("token");
    }
    getEmail(){
    if(this.emailForm.valid)
      {
        console.log(this.emailForm.value)
        let emailModel=Object.assign({},this.emailForm.value)
        this.userService.getByEmail(emailModel).subscribe(response=>{
          console.log(response.data)
        })
      }
    }

    login()
    {
      if(this.loginForm.valid)
        {
          console.log(this.loginForm.value)
          let loginModel=Object.assign({},this.loginForm.value)
          this.authService.login(loginModel).subscribe(response=>{
            console.log(response)
            this.toastrService.info(response.message)
            this.localStorage.setItem("token", response.data.token)
            this.router.navigate(['/cars']); 
            //localStorage.setItem("token",response.data.token)
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
  