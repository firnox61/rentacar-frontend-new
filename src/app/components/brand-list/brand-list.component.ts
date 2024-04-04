import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Brand } from '../../models/brand';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css'
})
export class BrandListComponent implements OnInit {
  brands:Brand[]=[];
  dataLoaded=false;
  constructor(private brandService:BrandService,private activatedRoute:ActivatedRoute
    , private router:Router){

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
  this.router.navigate(['/cars/brand/delete',brand.brandId]);
 }
 brandAdd()
 {
   this.router.navigate(['cars/brandlist/add']); 
 }


}
