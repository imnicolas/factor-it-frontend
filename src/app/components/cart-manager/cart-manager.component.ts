import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-manager',
  templateUrl: './cart-manager.component.html',
  styleUrls: ['./cart-manager.component.css']
})
export class CartManagerComponent implements OnInit {

  clienteId: number | null = null;
  fechaSimulada: string = '';
  cartIdToLoad: number | null = null;
  errorMessage: string = '';

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
  }

  crearCarrito() {
    this.errorMessage = '';
    if (!this.clienteId) {
      this.errorMessage = 'Debe ingresar un ID de cliente válido';
      return;
    }
    const fecha = this.fechaSimulada ? this.fechaSimulada : undefined;
    
    this.cartService.crearCarrito(this.clienteId, fecha).subscribe({
      next: (cart) => {
        this.router.navigate(['/carts', cart.id]);
      },
      error: (err) => {
        this.errorMessage = 'Error al crear el carrito: ' + (err.error?.message || err.message);
      }
    });
  }

  cargarCarrito() {
    if (this.cartIdToLoad) {
      this.router.navigate(['/carts', this.cartIdToLoad]);
    }
  }
}
