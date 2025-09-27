export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  isActive: boolean;
}

export interface CreateClientRequest {
  firstName: string;
  lastName: string;
  birthDate: string;
  isActive: boolean;
}

export interface UpdateClientRequest extends CreateClientRequest {
  id: string;
}
