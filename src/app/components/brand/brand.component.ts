import { Component, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit {
  brands:Brand[]=[];
  dataLoaded=false;
  currentBrand:Brand;
  filterBrandText="";
constructor(private brandService:BrandService,private router:Router)
{

}

ngOnInit(): void {
this.getBrands();
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
