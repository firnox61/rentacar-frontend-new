import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { UserDetail } from '../../models/userDetail';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  dataLoaded=false;
  userByDetail:UserDetail;
  userId:User;
  userUpdateForm:FormGroup;
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
      companyName:["",Validators.required]
    });
  }
  getUserByDetail()
  {
    let userId=this.authService.getUserDetail()
    this.userService.getUserBy(userId).subscribe(response=>{
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
      companyName:this.userByDetail.companyName
      /*passwordSalt:this.userByDetail.passwordSalt,
      passwordHash:this.userByDetail.passwordHash,
      status:this.userByDetail.status,*/
    });
  }
  navigateToUpdate() {
    this.router.navigate(['/cars/user/userupdate']);
  }
 /* update()
  {
    if(this.userUpdateForm.valid)
      {
        let userModel=Object.assign({},this.userUpdateForm.value)
        this.userService.update(userModel).subscribe(response=>{
          console.log(response);
          this.toastrService.success(response.message,"Başarılı")
        },responseError=>{
          if(responseError.error.Errors.length>0){
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
              
            }
          }
        })
  }*/
  

}
