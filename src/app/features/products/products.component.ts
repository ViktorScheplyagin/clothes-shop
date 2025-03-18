import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@/shared/material.module';
import { ProductRepository } from '@/data/repositories/product.repository';
import { ProductService } from '@/data/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '@/data/models/product.model';
import { ProductDetailsDialogComponent } from '@/features/products/product-details-dialog/product-details-dialog.component';
import { CartService } from '@/data/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProducts();
  }

  openProductDetails(product: Product) {
    const dialogRef = this.dialog.open(ProductDetailsDialogComponent, {
      width: '500px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'add_to_cart') {
        this.addToCart(result.product);
      }
    });
  }

  addToCart(product: Product, quantity: number = 1) {
    this.cartService.addToCart(product, quantity);
    this.snackBar.open(`${product.name} added to cart`, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
