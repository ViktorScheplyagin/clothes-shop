import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@/shared/material.module';
import {Product} from '@/data/models/product.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-product-details-dialog',
  imports: [CommonModule, MaterialModule],
  templateUrl: './product-details-dialog.component.html',
})
export class ProductDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
  ) {}

  addToCart() {
    console.log("addToCart");
    this.dialogRef.close({ action: "add_to_cart", product: this.product });
  }
}
