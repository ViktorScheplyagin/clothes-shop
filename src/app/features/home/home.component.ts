import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule],
  template: `
    <div class="container mx-auto">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Welcome to Clothes Shop</mat-card-title>
          <mat-card-subtitle>Find the latest fashion trends</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="my-4">
            Browse our collection of high-quality clothing items.
          </p>
          <div class="flex gap-4">
            <button mat-raised-button color="primary">Shop Now</button>
            <button mat-stroked-button color="accent">View Deals</button>
          </div>
        </mat-card-content>
      </mat-card>

      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <mat-card>
          <mat-card-header>
            <mat-card-title>New Arrivals</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Check out our latest products</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary">View All</button>
          </mat-card-actions>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Popular Items</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>See what other customers love</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary">View All</button>
          </mat-card-actions>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Special Offers</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Limited time discounts</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary">View All</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 1200px;
      }
    `,
  ],
})
export class HomeComponent {}
