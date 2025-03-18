import { Injectable } from '@angular/core';
import {ProductRepository} from '@/data/repositories/product.repository';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productData;
  products;
  loading;
  error;

  constructor(private productRepository: ProductRepository) {
    this.productData = this.productRepository.getData();
    this.products = this.productData.products;
    this.loading = this.productData.loading;
    this.error = this.productData.error;
  }

  getProducts() {
    // Use cached data if available
    this.productRepository.fetchProducts();
  }

  refreshProducts() {
    // Force refresh
    this.productRepository.refreshProducts();
  }
}
