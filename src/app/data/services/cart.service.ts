import { Injectable, signal, computed } from '@angular/core';
import { Product } from '@/data/models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  items = this.cartItems.asReadonly();

  itemCount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  );

  constructor() {
    // Try to restore cart from localStorage on service initialization
    this.loadCart();
  }

  addToCart(product: Product, quantity: number = 1): void {
    this.cartItems.update((items) => {
      // Check if product already exists in cart
      const existingItemIndex = items.findIndex(
        (item) => item.product.id === product.id
      );

      let updatedItems;
      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        updatedItems = [...items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
      } else {
        // Add new item
        updatedItems = [...items, { product, quantity }];
      }

      this.saveCart(updatedItems);
      return updatedItems;
    });
  }

  removeItem(productId: string): void {
    this.cartItems.update((items) => {
      const updatedItems = items.filter(
        (item) => item.product.id !== productId
      );
      this.saveCart(updatedItems);
      return updatedItems;
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    this.cartItems.update((items) => {
      const index = items.findIndex((item) => item.product.id === productId);
      if (index === -1) return items;

      const updatedItems = [...items];
      updatedItems[index] = {
        ...updatedItems[index],
        quantity,
      };

      this.saveCart(updatedItems);
      return updatedItems;
    });
  }

  clearCart(): void {
    this.cartItems.set([]);
    localStorage.removeItem('cart');
  }

  private saveCart(items: CartItem[]): void {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  private loadCart(): void {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cartItems.set(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }
}
