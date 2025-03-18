import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@/shared/material.module';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems = [
    { id: 1, name: 'T-Shirt', price: 19.99, quantity: 2 },
    { id: 2, name: 'Jeans', price: 49.99, quantity: 1 },
    { id: 3, name: 'Sneakers', price: 79.99, quantity: 1 },
  ];

  get subtotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  get tax(): number {
    return this.subtotal * 0.1; // 10% tax
  }

  get total(): number {
    return this.subtotal + this.tax;
  }

  updateQuantity(item: any, newQuantity: number): void {
    if (newQuantity >= 1) {
      item.quantity = newQuantity;
    }
  }

  removeItem(itemId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
  }
}
