import { Component, OnInit } from "@angular/core";
import { ClientService } from "@core/services/client.service";
import { Client, CreateClientRequest } from "@shared/models/client.model";

@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.scss"],
  standalone: false,
})
export class ClientListComponent implements OnInit {
  showNewClientForm: boolean = false;
  newClient: CreateClientRequest = {
    firstName: '',
    lastName: '',
    birthdate: '',
    isActive: false
  };
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchTerm: string = '';
  filterActiveOnly: boolean = false;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  private loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading clients:', error);
      }
    });
  }

  createClient(): void {
    if (this.isValidClient()) {
      this.clientService.createClient(this.newClient).subscribe({
        next: (createdClient) => {
          this.clients.push(createdClient);
          this.applyFilters();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating client:', error);
        }
      });
    }
  }

  editClient(client: Client): void {
    // TODO: Implement edit functionality
    console.log('Edit client:', client);
    // This will be implemented in the next step
  }

  deleteClient(client: Client): void {
    if (confirm(`Are you sure you want to delete ${client.firstName} ${client.lastName}?`)) {
      this.clientService.deleteClient(client.id).subscribe({
        next: () => {
          this.clients = this.clients.filter(c => c.id !== client.id);
          this.applyFilters();
        },
        error: (error) => {
          console.error('Error deleting client:', error);
        }
      });
    }
  }

  cancelCreate(): void {
    this.resetForm();
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
      filtered = filtered.filter(client =>
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

  private isValidClient(): boolean {
    return !!(this.newClient.firstName && this.newClient.lastName && this.newClient.birthdate);
  }

  private resetForm(): void {
    this.newClient = {
      firstName: '',
      lastName: '',
      birthdate: '',
      isActive: false
    };
    this.showNewClientForm = false;
  }

  trackByClientId(index: number, client: Client): string {
    return client.id;
  }
}
