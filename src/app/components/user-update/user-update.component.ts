import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit {
  dataLoaded=false;
  userByDetail:User;
  userId:User;
  userUpdateForm:FormGroup;
  //password:string;
  constructor( private activatedRoute:ActivatedRoute
    , private router:Router, private toastrService:ToastrService, private formBuilder:FormBuilder
    , private userService:UserService, private authService:AuthService){

  }


  ngOnInit(): void {
    this.createUserUpdateForm();
    this.getUserByDetail();
  }
  createUserUpdateForm()
  {
    this.userUpdateForm=this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      passwordSalt:["",Validators.required],
      passwordHash:["",Validators.required],
      status:["",Validators.required],
      password:["",Validators.required]

     // companyName:["",Validators.required]

    });
  }
  getUserByDetail()
  {
    let userId=this.authService.getUserDetail()
    this.userService.getUserByDetail(userId).subscribe(response=>{
      this.userByDetail=response.data;
      this.dataLoaded=true;
      //this.createUserUpdateForm();
      this.populateUserForm();
      console.log(this.userByDetail)
    });

  }
  populateUserForm() {
    this.userUpdateForm.patchValue({
      firstName: this.userByDetail.firstName,
      lastName: this.userByDetail.lastName,
      email: this.userByDetail.email,
      passwordSalt:this.userByDetail.passwordSalt,
      passwordHash:this.userByDetail.passwordHash,
      status:this.userByDetail.status,
      
    });
  }
  update()
  {
    if(this.userUpdateForm.valid)
      {
        let userModel=Object.assign({},this.userUpdateForm.value)
        this.userService.update(userModel,this.userUpdateForm.value.password).subscribe(response=>{
          console.log(response);
          this.toastrService.success(response.message,"Başarılı")
        },
          responseError=>{
          if(responseError.error.Errors.length>0){
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
              
            }
          }
        });
  }
  

}
}
