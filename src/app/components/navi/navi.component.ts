import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css'
})
export class NaviComponent implements OnInit {
  userLoggedIn: boolean = false;
  key:string
  user: User;
  firstName:string;
  lastName:string;
  isAuthenticated:boolean;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, 
    private toastrService:ToastrService, private localStorage:LocaleStorageService)
  {
  
  }
  logout():void{
    this.authService.logout();
    window.location.reload();
  }


  ngOnInit(): void {
    this.checkToLogin();
   // throw new Error('Method not implemented.');
  }
  checkToLogin()
  {
    if(this.localStorage.getItem(this.key))
      {
      return false;
  } else {
      return true;
  }
  }
 /* checkToLogin() {
    if (this.authService.isAuthanticated()) {
      return true;
    } else {
      return false;
    }
  }*/
  setUserLoggedIn() {
    this.userLoggedIn = this.authService.isAuthanticated();
  }
/*logOut(){
  this.localStorage.remove()
}*/



}
