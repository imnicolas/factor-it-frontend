import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8080/api/carritos';

  constructor(private http: HttpClient) { }

  crearCarrito(clienteId: number, fechaSimulada?: string): Observable<Cart> {
    let params = new HttpParams();
    if (fechaSimulada) {
      params = params.set('fechaSimulada', fechaSimulada);
    }
    return this.http.post<Cart>(this.apiUrl, { clienteId }, { params });
  }

  getCarrito(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/${id}`);
  }

  eliminarCarrito(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  agregarProducto(carritoId: number, productoId: number, cantidad: number): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/${carritoId}/productos`, { productoId, cantidad });
  }

  eliminarProducto(carritoId: number, productoId: number, cantidad?: number): Observable<Cart> {
    let params = new HttpParams();
    if (cantidad) {
      params = params.set('cantidad', cantidad.toString());
    }
    return this.http.delete<Cart>(`${this.apiUrl}/${carritoId}/productos/${productoId}`, { params });
  }

  finalizarCompra(carritoId: number): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/${carritoId}/finalizar`, {});
  }
}
