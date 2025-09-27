import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CreateClientRequest, Client } from '@shared/models/client.model';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  standalone: false,
})
export class ClientFormComponent implements OnInit, OnChanges {
  @Input() client: Client | null = null;
  @Input() isEditMode: boolean = false;
  @Input() showForm: boolean = false;
  @Output() formSubmit = new EventEmitter<CreateClientRequest>();
  @Output() formCancel = new EventEmitter<void>();

  formData: CreateClientRequest = {
    firstName: '',
    lastName: '',
    birthdate: '',
    isActive: false
  };

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['client'] || changes['isEditMode']) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    if (this.isEditMode && this.client) {
      this.formData = {
        firstName: this.client.firstName,
        lastName: this.client.lastName,
        birthdate: this.client.birthdate,
        isActive: this.client.isActive
      };
    } else {
      this.formData = {
        firstName: '',
        lastName: '',
        birthdate: '',
        isActive: false
      };
    }
  }

  onSubmit(): void {
    if (this.isValidForm()) {
      this.formSubmit.emit(this.formData);
    }
  }

  onCancel(): void {
    this.formCancel.emit();
    this.resetForm();
  }

  private resetForm(): void {
    this.formData = {
      firstName: '',
      lastName: '',
      birthdate: '',
      isActive: false
    };
  }

  get formTitle(): string {
    return this.isEditMode ? 'Edit Client' : 'Create New Client';
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'Update Client' : 'Create Client';
  }

  isValidForm(): boolean {
    return !!(this.formData.firstName && this.formData.lastName && this.formData.birthdate);
  }
}
