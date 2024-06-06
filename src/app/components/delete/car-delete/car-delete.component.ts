import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarService } from '../../../services/car.service';
import { Car } from '../../../models/car';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrl: './car-delete.component.css'
})
export class CarDeleteComponent implements OnInit {

  car: Car | null = null;
  carId!: number;
  carName: string;
  carDeleteForm: FormGroup;

  constructor( private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute)
    {
      
    }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  createCarDeleteForm() {
    this.carDeleteForm = this.formBuilder.group({
      id: [this.carId, Validators.required],
      carName: [this.carName, Validators.required],
      brandName: ['', Validators.required],
      colorName: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      modelYear: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

}
