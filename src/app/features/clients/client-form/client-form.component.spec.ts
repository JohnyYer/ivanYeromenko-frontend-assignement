import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ClientFormComponent } from './client-form.component';
import { Client } from '@shared/models/client.model';

describe('ClientFormComponent', () => {
  let component: ClientFormComponent;
  let fixture: ComponentFixture<ClientFormComponent>;

  const mockClient: Client = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    birthDate: '1990-01-01',
    isActive: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientFormComponent],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(ClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form for create mode', () => {
    component.isEditMode = false;
    component.ngOnInit();

    expect(component.formData.firstName).toBe('');
    expect(component.formData.lastName).toBe('');
    expect(component.formData.isActive).toBe(false);
    expect(component.formTitle).toBe('Create New Client');
    expect(component.submitButtonText).toBe('Create Client');
  });

  it('should initialize form for edit mode', () => {
    component.isEditMode = true;
    component.client = mockClient;
    component.ngOnInit();

    expect(component.formData.firstName).toBe('John');
    expect(component.formData.lastName).toBe('Doe');
    expect(component.formData.isActive).toBe(true);
    expect(component.formTitle).toBe('Edit Client');
    expect(component.submitButtonText).toBe('Update Client');
  });

  it('should emit form data on submit when valid', () => {
    jest.spyOn(component.formSubmit, 'emit');
    component.formData = {
      firstName: 'Jane',
      lastName: 'Smith',
      birthDate: '1985-05-15',
      isActive: true,
    };

    component.onSubmit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith(component.formData);
  });

  it('should emit form data even when invalid (validation handled by template)', () => {
    jest.spyOn(component.formSubmit, 'emit');
    component.formData = {
      firstName: '',
      lastName: 'Smith',
      birthDate: '1985-05-15',
      isActive: true,
    };

    component.onSubmit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith(component.formData);
  });

  it('should emit cancel event and reset form', () => {
    jest.spyOn(component.formCancel, 'emit');
    component.formData = {
      firstName: 'Jane',
      lastName: 'Smith',
      birthDate: '1985-05-15',
      isActive: true,
    };

    component.onCancel();

    expect(component.formCancel.emit).toHaveBeenCalled();
    expect(component.formData.firstName).toBe('');
  });

  it('should validate form correctly', () => {
    component.formData = {
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '1990-01-01',
      isActive: true,
    };

    expect(component.isValidForm()).toBe(true);

    component.formData.firstName = '';
    expect(component.isValidForm()).toBe(false);
  });

  it('should initialize date constraints', () => {
    component.ngOnInit();

    expect(component.maxDate).toBeDefined();
    expect(component.minDate).toBeDefined();
    expect(component.maxDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(component.minDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('should check form validity with NgForm', () => {
    const mockForm = {
      valid: true,
    } as NgForm;

    expect(component.isFormValid(mockForm)).toBe(true);

    const invalidForm = {
      valid: false,
    } as NgForm;

    expect(component.isFormValid(invalidForm)).toBe(false);
  });
});
