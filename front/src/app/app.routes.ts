import { Routes } from '@angular/router';
import { Principal } from './componentes/paginas/principal/principal';
import { PaginaPDF } from './componentes/paginas/pagina-pdf/pagina-pdf';
import { LoginComponent } from './componentes/paginas/login/login';
import { Registro } from './componentes/paginas/registro/registro';
import { actGuardGuard } from './guards/act-guard-guard';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "principal",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
    title: "Página | Login"
  },
  {
    path: "principal",
    component: Principal,
    title: "Página | Principal"
  },
  {
    path: "pagina-pdf",
    component: PaginaPDF,
    title: "Página | PDF",
    canActivate:[actGuardGuard]
  },
  {
    path: "registro",
    component: Registro,
    title: "Página | Registro"
  }
];
