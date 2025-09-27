import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ClientsComponent } from "@features/clients/clients.component";
import { HomeComponent } from "@features/home/home.component";
import { ClientListComponent } from "@features/clients/client-list/client-list.component";
import { ClientCardComponent } from "@features/clients/client-card/client-card.component";
import { ClientFormComponent } from "@features/clients/client-form/client-form.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, ClientsComponent, HomeComponent, ClientListComponent, ClientCardComponent, ClientFormComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
