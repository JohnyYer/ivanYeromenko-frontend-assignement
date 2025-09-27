import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ClientsComponent } from './clients.component';
import { ClientListComponent } from '@features/clients/components/client-list/client-list.component';
import { ClientFormComponent } from '@shared/components/client-form/client-form.component';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsComponent, ClientListComponent, ClientFormComponent],
      imports: [HttpClientTestingModule, FormsModule]
    });
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
