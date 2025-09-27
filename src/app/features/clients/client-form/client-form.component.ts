import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateClientRequest, Client } from '@shared/models/client.model';
import { DateUtilityService } from '@shared/services/date-utility.service';

export interface ClientFormData {
  client: Client | null;
  isEditMode: boolean;
}

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  standalone: false,
})
export class ClientFormComponent implements OnInit {
  client: Client | null = null;
  isEditMode: boolean = false;

  constructor(
    private dateUtility: DateUtilityService,
    private dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientFormData
  ) {
    this.client = data.client;
    this.isEditMode = data.isEditMode;
  }

  formData: CreateClientRequest = {
    firstName: '',
    lastName: '',
    birthDate: '',
    isActive: false,
  };

  originalFormData: CreateClientRequest = {
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

  private initializeForm(): void {
    if (this.isEditMode && this.client) {
      this.formData = {
        firstName: this.client.firstName,
        lastName: this.client.lastName,
        birthDate: this.dateUtility.formatForInput(this.client.birthDate),
        isActive: this.client.isActive,
      };
      // Store original data for comparison
      this.originalFormData = { ...this.formData };
    } else {
      this.formData = {
        firstName: '',
        lastName: '',
        birthDate: '',
        isActive: false,
      };
      this.originalFormData = { ...this.formData };
    }
  }

  onSubmit(): void {
    this.dialogRef.close(this.formData);
  }

  onCancel(): void {
    this.dialogRef.close();
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
    const constraints = this.dateUtility.getDateConstraints();
    this.maxDate = constraints.maxDate;
    this.minDate = constraints.minDate;
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

  hasFormChanged(): boolean {
    if (!this.isEditMode) {
      // For new clients, check if any field has a value
      return !!(
        this.formData.firstName ||
        this.formData.lastName ||
        this.formData.birthDate ||
        this.formData.isActive
      );
    }

    // For edit mode, compare with original data
    return (
      this.formData.firstName !== this.originalFormData.firstName ||
      this.formData.lastName !== this.originalFormData.lastName ||
      this.formData.birthDate !== this.originalFormData.birthDate ||
      this.formData.isActive !== this.originalFormData.isActive
    );
  }

  canSubmit(form: NgForm): boolean {
    return this.isFormValid(form) && this.hasFormChanged();
  }
}
