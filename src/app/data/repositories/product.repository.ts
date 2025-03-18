import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '@/data/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductRepository {
  private apiUrl = 'http://localhost:3000';
  private products = signal<Product[]>([]);
  private loading = signal<boolean>(false);
  private error = signal<string | null>(null);
  private lastFetchTime = signal<number | null>(null);

  private cacheExpirationTime = 5 * 60 * 1000; // 5 minutes

  constructor(private http: HttpClient) {}

  getData() {
    return {
      products: this.products,
      loading: this.loading,
      error: this.error,
    };
  }

  fetchProducts() {
    const currentTime = Date.now();
    const lastFetch = this.lastFetchTime();

    if (
      this.products().length > 0 &&
      lastFetch &&
      currentTime - lastFetch < this.cacheExpirationTime
    ) {
      console.log('Using cached products data');
    } else {
      this.refreshProducts();
    }
  }

  refreshProducts() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Product[]>(`${this.apiUrl}/products`).subscribe({
      next: (products) => {
        console.log('Products retrieved');
        this.products.set(products);
        this.loading.set(false);
        this.lastFetchTime.set(Date.now());
      },
      error: (error) => {
        console.log('Error retrieving products');
        this.error.set('Failed to retrieve products');
        this.loading.set(false);
      },
    });
  }
}
