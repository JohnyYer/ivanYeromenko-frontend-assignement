import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ClientListComponent } from './client-list.component';
import { ClientCardComponent } from '../client-card/client-card.component';
import { ClientFormComponent } from '../client-form/client-form.component';
import { ClientService } from '@core/services/client.service';
import { of } from 'rxjs';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;
  let clientService: jest.Mocked<ClientService>;

  const mockClients = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      birthdate: '1990-01-01',
      isActive: true,
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      birthdate: '1985-05-15',
      isActive: false,
    },
  ];

  beforeEach(() => {
    const spy = {
      getClients: jest.fn(),
      createClient: jest.fn(),
      updateClient: jest.fn(),
      deleteClient: jest.fn(),
    } as jest.Mocked<ClientService>;

    TestBed.configureTestingModule({
      declarations: [
        ClientListComponent,
        ClientCardComponent,
        ClientFormComponent,
      ],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [{ provide: ClientService, useValue: spy }],
    });

    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
    clientService = TestBed.inject(ClientService) as jest.Mocked<ClientService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load clients on init', () => {
    clientService.getClients.mockReturnValue(of(mockClients));

    component.ngOnInit();

    expect(clientService.getClients).toHaveBeenCalled();
    expect(component.clients).toEqual(mockClients);
    expect(component.filteredClients).toEqual(mockClients);
  });

  it('should filter clients by search term', () => {
    component.clients = mockClients;
    component.searchTerm = 'John';

    component.onSearchChange();

    expect(component.filteredClients).toEqual([mockClients[0]]);
  });

  it('should filter clients by active status', () => {
    component.clients = mockClients;
    component.filterActiveOnly = true;

    component.onFilterChange();

    expect(component.filteredClients).toEqual([mockClients[0]]);
  });

  it('should show create form', () => {
    component.showCreateForm();

    expect(component.showForm).toBe(true);
    expect(component.isEditMode).toBe(false);
    expect(component.editingClient).toBe(null);
  });

  it('should create a new client', () => {
    const newClient = {
      firstName: 'Test',
      lastName: 'User',
      birthdate: '2000-01-01',
      isActive: true,
    };
    const createdClient = { id: '3', ...newClient };

    clientService.createClient.mockReturnValue(of(createdClient));
    component.clients = [];
    component.isEditMode = false;

    component.onFormSubmit(newClient);

    expect(clientService.createClient).toHaveBeenCalledWith(newClient);
    expect(component.clients).toContain(createdClient);
  });

  it('should delete a client', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true);
    clientService.deleteClient.mockReturnValue(of(undefined));
    component.clients = [...mockClients];

    component.deleteClient(mockClients[0]);

    expect(clientService.deleteClient).toHaveBeenCalledWith('1');
    expect(component.clients).not.toContain(mockClients[0]);
  });

  it('should start editing a client', () => {
    component.editClient(mockClients[0]);

    expect(component.showForm).toBe(true);
    expect(component.isEditMode).toBe(true);
    expect(component.editingClientId).toBe('1');
    expect(component.editingClient).toEqual(mockClients[0]);
  });

  it('should update a client', () => {
    const updatedClient = { ...mockClients[0], firstName: 'Johnny' };
    clientService.updateClient.mockReturnValue(of(updatedClient));
    component.clients = [...mockClients];
    component.isEditMode = true;
    component.editingClientId = '1';
    const updateData = { ...mockClients[0], firstName: 'Johnny' };

    component.onFormSubmit(updateData);

    expect(clientService.updateClient).toHaveBeenCalledWith(
      '1',
      expect.objectContaining({ id: '1', firstName: 'Johnny' })
    );
    expect(component.clients[0].firstName).toBe('Johnny');
    expect(component.showForm).toBe(false);
  });

  it('should cancel form', () => {
    component.showForm = true;
    component.isEditMode = true;
    component.editingClientId = '1';
    component.editingClient = mockClients[0];

    component.onFormCancel();

    expect(component.showForm).toBe(false);
    expect(component.isEditMode).toBe(false);
    expect(component.editingClientId).toBe(null);
    expect(component.editingClient).toBe(null);
  });
});
