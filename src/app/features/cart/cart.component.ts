import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@/shared/material.module';
import { CartService } from '@/data/services/cart.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private cartService = inject(CartService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  // Get cart items from service
  get cartItems() {
    return this.cartService.items();
  }

  // Get subtotal from service
  get subtotal(): number {
    return this.cartService.totalPrice();
  }

  get tax(): number {
    return this.subtotal * 0.1; // 10% tax
  }

  get total(): number {
    return this.subtotal + this.tax;
  }

  updateQuantity(item: any, newQuantity: number): void {
    if (newQuantity >= 1) {
      this.cartService.updateQuantity(item.product.id, newQuantity);
    }
  }

  removeItem(productId: string): void {
    this.cartService.removeItem(productId);
    this.snackBar.open('Item removed from cart', 'Close', {
      duration: 3000,
    });
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.snackBar.open('Cart cleared', 'Close', {
      duration: 3000,
    });
  }

  checkout(): void {
    // This would typically navigate to a checkout page
    this.snackBar.open('Proceeding to checkout...', 'Close', {
      duration: 3000,
    });
    // For now just clear the cart
    this.cartService.clearCart();
    // Navigate to home or products page
    this.router.navigate(['/']);
  }
}
