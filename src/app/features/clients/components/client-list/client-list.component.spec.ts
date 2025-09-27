import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ClientListComponent } from './client-list.component';
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
      isActive: true
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      birthdate: '1985-05-15',
      isActive: false
    }
  ];

  beforeEach(() => {
    const spy = {
      getClients: jest.fn(),
      createClient: jest.fn(),
      deleteClient: jest.fn()
    } as jest.Mocked<ClientService>;

    TestBed.configureTestingModule({
      declarations: [ClientListComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: ClientService, useValue: spy }
      ]
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

  it('should create a new client', () => {
    const newClient = {
      firstName: 'Test',
      lastName: 'User',
      birthdate: '2000-01-01',
      isActive: true
    };
    const createdClient = { id: '3', ...newClient };
    
    clientService.createClient.mockReturnValue(of(createdClient));
    component.newClient = newClient;
    
    component.createClient();
    
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
});
