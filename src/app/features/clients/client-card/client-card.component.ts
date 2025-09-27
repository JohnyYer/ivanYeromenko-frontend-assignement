import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Client } from '@shared/models/client.model';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss'],
  standalone: false,
})
export class ClientCardComponent {
  @Input() client!: Client;
  @Input() isDeleting: boolean = false;
  @Output() edit = new EventEmitter<Client>();
  @Output() delete = new EventEmitter<Client>();

  onEdit(): void {
    this.edit.emit(this.client);
  }

  onDelete(): void {
    this.delete.emit(this.client);
  }
}
