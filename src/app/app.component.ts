import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from '@/shared/shared.module';
import { CartService } from '@/data/services/cart.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@/shared/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SharedModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'clothes-shop';
  cartService = inject(CartService);
  themeService = inject(ThemeService);
}
