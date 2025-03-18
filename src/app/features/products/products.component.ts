import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@/shared/material.module';
import { ProductRepository } from '@/data/repositories/product.repository';
import {ProductService} from '@/data/services/product.service';
import {MatDialog} from '@angular/material/dialog';
import {Product} from '@/data/models/product.model';
import {
  ProductDetailsDialogComponent
} from '@/features/products/product-details-dialog/product-details-dialog.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProducts();
  }

  openProductDetails(product: Product) {
    const dialogRef = this.dialog.open(ProductDetailsDialogComponent, {
      width: "500px",
      data: product,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.action === "add_to_cart") {
        // TODO: implement the add_to_cart action
        console.log("Product added to cart from dialog:", result.product);
      }
    })
  }
}
