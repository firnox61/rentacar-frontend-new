import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { RentalComponent } from './components/rental/rental.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { CarListComponent } from './components/car-list/car-list.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars",component:CarComponent},
  //{path:"cars/add",component:CarAddComponent},
  //{path:"cars/update/:carId",component:CarUpdateComponent},
  {path:"cars/brandlist/update/:brandId",component:BrandUpdateComponent},
  {path:"cars/colorlist/update/:colorId",component:ColorUpdateComponent},
  {path:"cars/carlist/update/:carId",component:CarUpdateComponent},
  {path:"cars/brandlist",component:BrandListComponent},
  {path:"cars/colorlist",component:ColorListComponent},
  {path:"cars/carlist",component:CarListComponent},
  {path:"cars/brand/:brandId",component:CarComponent},

  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/:carId",component:CarDetailComponent},
  {path:"rental/:carId",component:RentalComponent},
  { path: 'payment', component: PaymentComponent },
  {path:"cars/brandlist/add",component:BrandAddComponent},
  {path:"cars/colorlist/add",component:ColorAddComponent},
  {path:"cars/carlist/add",component:CarAddComponent}


  
  //{path:"cars",component:CarComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
