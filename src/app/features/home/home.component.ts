import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  adBlocks = [
    { title: 'New Arrivals', content: 'Check out our latest products' },
    { title: 'Popular Items', content: 'See what other customers love' },
    { title: 'Special Offers', content: 'Limited time discounts' },
  ];
}
