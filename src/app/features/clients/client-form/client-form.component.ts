import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
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
    birthDate: '',
    isActive: false,
  };

  // Date constraints for validation
  maxDate: string = '';
  minDate: string = '';

  ngOnInit(): void {
    this.initializeDateConstraints();
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
        birthDate: this.client.birthDate,
        isActive: this.client.isActive,
      };
    } else {
      this.formData = {
        firstName: '',
        lastName: '',
        birthDate: '',
        isActive: false,
      };
    }
  }

  onSubmit(): void {
    this.formSubmit.emit(this.formData);
  }

  onCancel(): void {
    this.formCancel.emit();
    this.resetForm();
  }

  private resetForm(): void {
    this.formData = {
      firstName: '',
      lastName: '',
      birthDate: '',
      isActive: false,
    };
  }

  get formTitle(): string {
    return this.isEditMode ? 'Edit Client' : 'Create New Client';
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'Update Client' : 'Create Client';
  }

  private initializeDateConstraints(): void {
    const today = new Date();
    const minDate = new Date(1900, 0, 1);

    this.maxDate = today.toISOString().split('T')[0];
    this.minDate = minDate.toISOString().split('T')[0];
  }

  isFormValid(form: NgForm): boolean {
    return form.valid ?? false;
  }

  isValidForm(): boolean {
    return !!(
      this.formData.firstName &&
      this.formData.lastName &&
      this.formData.birthDate
    );
  }
}
