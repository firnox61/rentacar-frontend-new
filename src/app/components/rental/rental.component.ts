import { Component, OnInit } from '@angular/core';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';
import { RentalDetail } from '../../models/rentalDetail';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent implements OnInit {
  rentals:Rental[]=[];
dataLoaded=false;
carId: number;
rentDate: Date;
returnDate: Date;
constructor(private rentalService:RentalService, private activatedRoute:ActivatedRoute)
{

}
  ngOnInit() {
   this.activatedRoute.params.subscribe(params=>{
    this.carId = +params['carId'];
   })
  }



  AddRental(rentals:Rental)
  {
    this.rentalService.AddRental(rentals).subscribe(
      response=>{
      console.log('Araç başarıyla kiralandı:', response);
      
    }
    )
  }
 /* getRentalsDetail()
  {
    this.rentalService.getRentalsDetail().subscribe(Response=>{
      this.rentals=Response.data;
      this.dataLoaded=true;
    })
  }*/

}
