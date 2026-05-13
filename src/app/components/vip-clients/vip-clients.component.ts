import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-vip-clients',
  templateUrl: './vip-clients.component.html',
  styleUrls: ['./vip-clients.component.css']
})
export class VipClientsComponent implements OnInit {

  clients: Client[] = [];
  errorMessage: string = '';
  
  queryAnio: number = new Date().getFullYear();
  queryMes: number = new Date().getMonth() + 1;

  viewTitle: string = 'Clientes VIP';

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadVipClients();
  }

  loadVipClients() {
    this.clearMessages();
    this.viewTitle = 'Clientes VIP Actuales';
    this.clientService.getVipClients().subscribe({
      next: (data) => this.clients = data,
      error: (err) => this.handleError(err)
    });
  }

  loadNewVipClients() {
    this.clearMessages();
    this.viewTitle = `Nuevos Clientes VIP (Mes: ${this.queryMes}, Año: ${this.queryAnio})`;
    this.clientService.getNewVipClients(this.queryAnio, this.queryMes).subscribe({
      next: (data) => this.clients = data,
      error: (err) => this.handleError(err)
    });
  }

  loadLostVipClients() {
    this.clearMessages();
    this.viewTitle = `Clientes que Perdieron VIP (Mes: ${this.queryMes}, Año: ${this.queryAnio})`;
    this.clientService.getLostVipClients(this.queryAnio, this.queryMes).subscribe({
      next: (data) => this.clients = data,
      error: (err) => this.handleError(err)
    });
  }

  clearMessages() {
    this.errorMessage = '';
    this.clients = [];
  }

  handleError(err: any) {
    this.errorMessage = 'Error al cargar clientes: ' + (err.error?.message || err.message);
  }
}
