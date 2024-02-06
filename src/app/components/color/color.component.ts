import { Component, OnInit } from '@angular/core';
import { Color } from '../../models/color';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrl: './color.component.css'
})
export class ColorComponent implements OnInit {
  colors:Color[]=[];
  dataLoaded=false;
  currentColor:Color;
  filterColorText="";
  constructor(private colorService:ColorService)
  {

  }
  ngOnInit(): void {
    this.getColors();
  }
  getColors()
  {
    this.colorService.getColors().subscribe(Response=>{
      this.colors=Response.data;
      this.dataLoaded=true;
    })
  }
  setCurrentColor(color:Color)
  {
    this.currentColor=color;
  }

  getCurrentColorClass(color:Color)
  {
    if(color==this.currentColor)
    {
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }
  getAllColorClass()
  {
    if(!this.currentColor)
    {
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }

}
