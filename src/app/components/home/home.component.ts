import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  searchText: string = '';
  promos = [
    {
      image: 'assets/promo1.jpg',
      title: 'Yaz Kampanyası',
      description: 'Yaz boyunca seçili araçlarda %20 indirim.'
    },
    {
      image: 'assets/promo2.jpg',
      title: 'Hafta Sonu Fırsatı',
      description: 'Hafta sonu kiralamalarında ekstra 1 gün ücretsiz.'
    },
    // Diğer kampanyalar
  ];

  constructor() { }

  ngOnInit(): void {
  }

  searchCars(): void {
    // Araç arama fonksiyonu burada olacak
    console.log('Aranan kelime:', this.searchText);
  }
}