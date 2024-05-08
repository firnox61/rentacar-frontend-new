import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { UserDetail } from '../../models/userDetail';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  dataLoaded=false;
  userByDetail:UserDetail;
  userId:UserDetail;
  userUpdateForm:FormGroup;
  constructor( private activatedRoute:ActivatedRoute
    , private router:Router, private toastrService:ToastrService, private formBuilder:FormBuilder
    , private userService:UserService, private authService:AuthService){

  }
  ngOnInit(): void {
    this.getUserByDetail();
  }
  createUserUpdateForm()
  {
    this.userUpdateForm=this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      companyName:["",Validators.required],

    })
  }
  getUserByDetail()
  {
    let userId=this.authService.getUserDetail()
    this.userService.getUserByDetail(userId).subscribe(response=>{
      this.userByDetail=response.data;
      console.log(this.userByDetail)
    })

  }
  /*getUser()
  {
    let userModel=Object.assign({},this.userDetailForm.value)
    user
  }*/

}
