import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { AdminComponent } from './admin/admin.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { TuristaComponent } from './turista/turista/turista.component';
import { VlasnikComponent } from './vlasnik/vlasnik/vlasnik.component';
import { RezervisanjeComponent } from './turista/rezervisanje/rezervisanje.component';

export const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "adminLogin", component: AdminLoginComponent},
  {path: "registracija", component: RegistracijaComponent},
  {path: "turista", component: TuristaComponent},
  {path: "vlasnik", component: VlasnikComponent},
  {path: "admin", component: AdminComponent},
  {path: "promenaLozinke", component: PromenaLozinkeComponent},
  {path: "rezervisanje", component: RezervisanjeComponent}
];
