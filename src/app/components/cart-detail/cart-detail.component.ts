import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Cart, EstadoCarrito } from '../../models/cart.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit, OnDestroy {

  cart: Cart | null = null;
  products: Product[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  selectedProductId: number | null = null;
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.loadCart(Number(idParam));
    }
    this.loadProducts();
  }

  ngOnDestroy(): void {
    // Si el carrito sigue abierto cuando el usuario sale de la vista, se destruye
    if (this.cart && this.cart.state === EstadoCarrito.ABIERTO) {
      this.cartService.eliminarCarrito(this.cart.id).subscribe({
        error: (err) => console.error('Error auto-eliminando carrito no finalizado', err)
      });
    }
  }

  loadCart(id: number) {
    this.cartService.getCarrito(id).subscribe({
      next: (cart) => {
        this.cart = cart;
      },
      error: (err) => {
        this.errorMessage = 'No se pudo cargar el carrito. ' + (err.error?.message || err.message);
      }
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe(prods => this.products = prods);
  }

  addProduct() {
    this.clearMessages();
    if (!this.cart || !this.selectedProductId) return;

    this.cartService.agregarProducto(this.cart.id, this.selectedProductId, this.selectedQuantity).subscribe({
      next: (cart) => {
        this.cart = cart;
        this.successMessage = 'Producto agregado exitosamente.';
      },
      error: (err) => {
        this.errorMessage = 'Error al agregar producto: ' + (err.error?.message || err.message);
      }
    });
  }

  removeProduct(productoId: number, cantidad?: number) {
    this.clearMessages();
    if (!this.cart) return;

    this.cartService.eliminarProducto(this.cart.id, productoId, cantidad).subscribe({
      next: (cart) => {
        this.cart = cart;
        this.successMessage = 'Producto removido exitosamente.';
      },
      error: (err) => {
        this.errorMessage = 'Error al remover producto: ' + (err.error?.message || err.message);
      }
    });
  }

  finalizePurchase() {
    this.clearMessages();
    if (!this.cart) return;

    this.cartService.finalizarCompra(this.cart.id).subscribe({
      next: (cart) => {
        this.cart = cart;
        this.successMessage = '¡Compra finalizada con éxito!';
      },
      error: (err) => {
        this.errorMessage = 'Error al finalizar la compra: ' + (err.error?.message || err.message);
      }
    });
  }

  deleteCart() {
    this.clearMessages();
    if (!this.cart) return;

    if(confirm('¿Está seguro de eliminar/destruir este carrito?')) {
      this.cartService.eliminarCarrito(this.cart.id).subscribe({
        next: () => {
          alert('Carrito eliminado');
          this.router.navigate(['/carts']);
        },
        error: (err) => {
          this.errorMessage = 'Error al eliminar el carrito: ' + (err.error?.message || err.message);
        }
      });
    }
  }

  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  get isReadonly(): boolean {
    return this.cart?.state === EstadoCarrito.COMPLETADO || this.cart?.state === EstadoCarrito.DESTRUIDO;
  }
}
