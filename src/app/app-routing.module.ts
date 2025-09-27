import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientsComponent } from "./features/clients/components/clients/clients.component";
import { HomeComponent } from "./features/home/components/home.component";

const routes: Routes = [
  {
    path: "clients",
    component: ClientsComponent,
  },
  {
    path: "",
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
