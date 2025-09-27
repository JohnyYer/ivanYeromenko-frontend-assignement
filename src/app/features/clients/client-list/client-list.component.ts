import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '@core/services/client.service';
import { Client, CreateClientRequest } from '@shared/models/client.model';
import {
  ClientFormComponent,
  ClientFormData,
} from '../client-form/client-form.component';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData,
} from '@shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  standalone: false,
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchTerm: string = '';
  filterActiveOnly: boolean = false;

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: clients => {
        this.clients = clients;
        this.applyFilters();
      },
      error: error => {
        console.error('Error loading clients:', error);
      },
    });
  }

  showCreateForm(): void {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      width: '600px',
      maxWidth: '90vw',
      data: {
        client: null,
        isEditMode: false,
      } as ClientFormData,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createClient(result);
      }
    });
  }

  editClient(client: Client): void {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      width: '600px',
      maxWidth: '90vw',
      data: {
        client: client,
        isEditMode: true,
      } as ClientFormData,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateClient(client.id, result);
      }
    });
  }

  private createClient(clientData: CreateClientRequest): void {
    this.clientService.createClient(clientData).subscribe({
      next: createdClient => {
        this.clients.push(createdClient);
        this.applyFilters();
      },
      error: error => {
        console.error('Error creating client:', error);
      },
    });
  }

  private updateClient(
    clientId: string,
    clientData: CreateClientRequest
  ): void {
    const updateRequest = {
      id: clientId,
      ...clientData,
    };

    this.clientService.updateClient(clientId, updateRequest).subscribe({
      next: updatedClient => {
        const index = this.clients.findIndex(c => c.id === clientId);
        if (index !== -1) {
          this.clients[index] = updatedClient;
          this.applyFilters();
        }
      },
      error: error => {
        console.error('Error updating client:', error);
      },
    });
  }

  deleteClient(client: Client): void {
    const dialogData: ConfirmationDialogData = {
      title: 'Delete Client',
      message: `Are you sure you want to delete ${client.firstName} ${client.lastName}? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger',
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      maxWidth: '90vw',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(client.id).subscribe({
          next: () => {
            this.clients = this.clients.filter(c => c.id !== client.id);
            this.applyFilters();
          },
          error: error => {
            console.error('Error deleting client:', error);
          },
        });
      }
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.clients];

    // Search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        client =>
          client.firstName.toLowerCase().includes(searchLower) ||
          client.lastName.toLowerCase().includes(searchLower)
      );
    }

    // Active filter
    if (this.filterActiveOnly) {
      filtered = filtered.filter(client => client.isActive);
    }

    this.filteredClients = filtered;
  }

  trackByClientId(index: number, client: Client): string {
    return client.id;
  }
}
