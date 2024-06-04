import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Brand } from '../../models/brand';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css'
})
export class BrandListComponent implements OnInit {
  brands:Brand[]=[];
  dataLoaded=false;
  filterBrandText="";
  constructor(private brandService:BrandService,private activatedRoute:ActivatedRoute
    , private router:Router,private toastrService:ToastrService){

  }
  ngOnInit(): void {
    this.getBrands();
  }


  getBrands()
{
  this.brandService.getBrands().subscribe(response=>{
    this.brands=response.data;
    this.dataLoaded=true;
  })
}
brandUpdate(brand:Brand)
 {
   this.router.navigate(['/cars/brand/update',brand.brandId]); 
 }
 brandDelete(brand:Brand)
 {
 this.brandService.delete(brand).subscribe(response=>{
  this.toastrService.success(response.message,"Silme Başarılı")

 },responseError=>{
  if(responseError.error.Errors.length>0){
    for (let i = 0; i < responseError.error.Errors.length; i++) {
     this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Marka içerisinde araçlar var silemezsiniz!")
      
    }
  }
})
 }
 brandAdd()
 {
   this.router.navigate(['cars/brandlist/add']); 
 }


}
