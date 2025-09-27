import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from '@features/clients/clients.component';
import { HomeComponent } from '@features/home/home.component';
import { ClientListComponent } from '@features/clients/client-list/client-list.component';
import { ClientCardComponent } from '@features/clients/client-card/client-card.component';
import { ClientFormComponent } from '@features/clients/client-form/client-form.component';
import { FormsModule } from '@angular/forms';
import { DateFormatPipe } from '@shared/pipes/date-format.pipe';

// Angular Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    HomeComponent,
    ClientListComponent,
    ClientCardComponent,
    ClientFormComponent,
    DateFormatPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
