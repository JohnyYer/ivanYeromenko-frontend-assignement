import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ClientsComponent } from "./features/clients/components/clients/clients.component";
import { HomeComponent } from "./features/home/components/home.component";
import { ClientListComponent } from "./features/clients/components/client-list/client-list.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, ClientsComponent, HomeComponent, ClientListComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
