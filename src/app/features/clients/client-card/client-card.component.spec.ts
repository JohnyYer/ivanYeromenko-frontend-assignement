import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientCardComponent } from './client-card.component';
import { Client } from '@shared/models/client.model';

describe('ClientCardComponent', () => {
  let component: ClientCardComponent;
  let fixture: ComponentFixture<ClientCardComponent>;

  const mockClient: Client = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    birthDate: '1990-01-01',
    isActive: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientCardComponent],
    });
    fixture = TestBed.createComponent(ClientCardComponent);
    component = fixture.componentInstance;
    component.client = mockClient;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display client information', () => {
    const compiled = fixture.nativeElement;
    const clientInfo = compiled.querySelector('.client-info');

    expect(clientInfo.textContent).toContain('John Doe');
    expect(clientInfo.textContent).toContain('1990-01-01');
    expect(clientInfo.textContent).toContain('Active');
  });

  it('should emit edit event when edit is clicked', () => {
    jest.spyOn(component.edit, 'emit');
    const compiled = fixture.nativeElement;
    const editLink = compiled.querySelector('.edit-link');

    editLink.click();

    expect(component.edit.emit).toHaveBeenCalledWith(mockClient);
  });

  it('should emit delete event when delete is clicked', () => {
    jest.spyOn(component.delete, 'emit');
    const compiled = fixture.nativeElement;
    const deleteLink = compiled.querySelector('.delete-link');

    deleteLink.click();

    expect(component.delete.emit).toHaveBeenCalledWith(mockClient);
  });

  it('should display "Inactive" for inactive clients', () => {
    component.client = { ...mockClient, isActive: false };
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const clientInfo = compiled.querySelector('.client-info');

    expect(clientInfo.textContent).toContain('Inactive');
  });
});
