import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientService } from './client.service';
import { Client, CreateClientRequest } from '@shared/models/client.model';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientService]
    });
    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get clients', () => {
    const mockClients: Client[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        birthdate: '1990-01-01',
        isActive: true
      }
    ];

    service.getClients().subscribe(clients => {
      expect(clients).toEqual(mockClients);
    });

    const req = httpMock.expectOne('http://localhost:3000/clients');
    expect(req.request.method).toBe('GET');
    req.flush(mockClients);
  });

  it('should create a client', () => {
    const newClient: CreateClientRequest = {
      firstName: 'Jane',
      lastName: 'Smith',
      birthdate: '1985-05-15',
      isActive: true
    };

    const createdClient: Client = {
      id: '2',
      ...newClient
    };

    service.createClient(newClient).subscribe(client => {
      expect(client).toEqual(createdClient);
    });

    const req = httpMock.expectOne('http://localhost:3000/clients');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newClient);
    req.flush(createdClient);
  });
});
