export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  isActive: boolean;
}

export interface CreateClientRequest {
  firstName: string;
  lastName: string;
  birthdate: string;
  isActive: boolean;
}

export interface UpdateClientRequest extends CreateClientRequest {
  id: string;
}
