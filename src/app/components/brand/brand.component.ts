import { Component, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit {
  brands:Brand[]=[];
  dataLoaded=false;
  brand:Brand;
  currentBrand:Brand;
  filterBrandText="";
constructor(private brandService:BrandService,private activatedRoute:ActivatedRoute
  , private router:Router)
{

}

ngOnInit(): void {
  // this.activatedRoute.params.subscribe(params=>{
  //   if(params["brandId"]){
  //     this.brandUpdate(params["brandId"]);
  //   }
  // })
this.getBrands();
//this.BrandUpdate(this.brand)
}

getBrands()
{
  this.brandService.getBrands().subscribe(Response=>{
    this.brands=Response.data;
    this.dataLoaded=true;
  })
}
setCurrentBrand(brand:Brand){
  this.currentBrand=brand;
  //this.router.navigate(['brands',brand.brandId]);
}
getCurrentBrandClass(brand:Brand){
  if(brand==this.currentBrand){
    return "list-group-item active";
  }
  else{
    return "list-group-item";
  }
}
getAllBrandClass()
{
  if(!this.currentBrand)
  {
    return "list-group-item active";
  }
  else{
    return "list-group-item";
  }
}
BrandAdd()
{
  this.router.navigate(['/brands/add']); 
}
 
}
