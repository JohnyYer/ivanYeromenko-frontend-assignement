import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ClientService } from "./client.service";

@Component({
  selector: "app-clients",
  template: `
    <div class="create-client">
    <button style="font-size: 16px" (click)="showNewClientForm = true">Create client</button>
    </div>
    <div class="clients">
      <div class="new-client" *ngIf="showNewClientForm">
        <h3>Create new client</h3>
        <input
          type="text"
          placeholder="First name"
          [(ngModel)]="newClient.firstName"
        />
        <input
          type="text"
          placeholder="Last name"
          [(ngModel)]="newClient.lastName"
        />
        <input
          type="text"
          placeholder="Birthdate"
          [(ngModel)]="newClient.birthdate"
        />
        <input
          type="text"
          placeholder="Active state"
          [(ngModel)]="newClient.isActive"
        />
        <button (click)="createClient()">Create client</button>
      </div>
      <div class="clients-filter">
        <h3>Filter clients</h3>
        <div class="flex-wrapper">
        <input type="text" placeholder="Filter by clients name" />
        <div class="filter-checkbox-wrapper">
        <input id="filterCheckbox" type="checkbox"/> 
        <span style="padding-left: 8px"><label for="filterCheckbox">Filter by active state</label></span>
        </div>
        </div>
      </div>
      <div class="client-card" *ngFor="let client of clients">
        <span>
          {{ client.firstName }} {{ client.lastName }} -
          {{ client.birthdate }} - {{ client.isActive }}
        </span>
        <span>
          <a>Edit</a>
          <a style="padding-left: 8px">Delete</a>
        </span>
      </div>
    </div>
  `,
  standalone: false,
  styles: [
    `
      .filter-checkbox-wrapper {
        padding-left: 20px;
        display: flex;
        align-items: center;
      }
      .flex-wrapper {
        display: flex;
        justify-content: flex-start;
      }
      .create-client {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 16px;
      }
      .clients {
        padding: 16px;
      }
      .new-client {
        padding: 8px 32px;
        border: 1px solid #006175;
        margin-bottom: 16px;
      }
      .clients-filter {
        padding: 8px 32px;
        border: 1px solid #006175;
        margin-bottom: 16px;
      }
      
      #filterCheckbox {
        width: 20px;
        height: 20px;
        padding-left: 40px
      }
    `,
  ],
})
export class ClientsComponent {
  showNewClientForm: boolean = false;
  newClient: any = {};
  clients: any = [];
  clientService;

  constructor(private http: HttpClient) {
    this.clientService = new ClientService(this.http);
    this.clientService.getClients().subscribe((data) => {
      this.clients = data;
    });
  }

  createClient() {
    this.showNewClientForm = true;
    this.clientService.createClient(this.newClient).subscribe((data) => {
      this.clients.push(data);
      this.newClient = {};
      this.showNewClientForm = false;
    });
  }
}
