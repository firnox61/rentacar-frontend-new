import { Component, OnInit } from '@angular/core';
import { Color } from '../../models/color';
import { ColorService } from '../../services/color.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrl: './color-list.component.css'
})
export class ColorListComponent implements OnInit {
  colors:Color[]=[];
  dataLoaded=false;
  filterColorText="";
  constructor(private colorService:ColorService,private activatedRoute:ActivatedRoute
    , private router:Router){

  }
  ngOnInit(): void {
    this.getColors();
  }
  getColors()
  {
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
      this.dataLoaded=true;
    })
  }
  colorUpdate(color:Color)
 {
   this.router.navigate(['/cars/color/update',color.colorId]); 
 }
 colorDelete(color:Color)
 {
  this.router.navigate(['/cars/color/delete',color.colorId]);
 }
 colorAdd()
 {
   this.router.navigate(['cars/colorlist/add']); 
 }
}
