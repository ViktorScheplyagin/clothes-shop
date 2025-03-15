import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categories = [
    { name: 'Men', icon: 'person', count: 42 },
    { name: 'Women', icon: 'person_outline', count: 56 },
    { name: 'Kids', icon: 'child_care', count: 28 },
    { name: 'Accessories', icon: 'watch', count: 35 },
    { name: 'Shoes', icon: 'hiking', count: 24 },
    { name: 'Sports', icon: 'sports_basketball', count: 19 },
  ];
}
