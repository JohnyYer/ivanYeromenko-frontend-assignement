import { Component, OnInit } from '@angular/core';
import { ClientService } from '@core/services/client.service';
import { Client, CreateClientRequest } from '@shared/models/client.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  standalone: false,
})
export class ClientListComponent implements OnInit {
  showForm: boolean = false;
  isEditMode: boolean = false;
  editingClientId: string | null = null;
  editingClient: Client | null = null;
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchTerm: string = '';
  filterActiveOnly: boolean = false;

  constructor(private clientService: ClientService) {}

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
    this.isEditMode = false;
    this.editingClient = null;
    this.editingClientId = null;
    this.showForm = true;
  }

  editClient(client: Client): void {
    this.isEditMode = true;
    this.editingClientId = client.id;
    this.editingClient = client;
    this.showForm = true;
  }

  onFormSubmit(clientData: CreateClientRequest): void {
    if (this.isEditMode && this.editingClientId) {
      // Update existing client
      const updateRequest = {
        id: this.editingClientId,
        ...clientData,
      };

      this.clientService
        .updateClient(this.editingClientId, updateRequest)
        .subscribe({
          next: updatedClient => {
            const index = this.clients.findIndex(
              c => c.id === this.editingClientId
            );
            if (index !== -1) {
              this.clients[index] = updatedClient;
              this.applyFilters();
            }
            this.onFormCancel();
          },
          error: error => {
            console.error('Error updating client:', error);
          },
        });
    } else {
      // Create new client
      this.clientService.createClient(clientData).subscribe({
        next: createdClient => {
          this.clients.push(createdClient);
          this.applyFilters();
          this.onFormCancel();
        },
        error: error => {
          console.error('Error creating client:', error);
        },
      });
    }
  }

  onFormCancel(): void {
    this.showForm = false;
    this.isEditMode = false;
    this.editingClientId = null;
    this.editingClient = null;
  }

  deleteClient(client: Client): void {
    if (
      confirm(
        `Are you sure you want to delete ${client.firstName} ${client.lastName}?`
      )
    ) {
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
