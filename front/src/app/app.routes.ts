import { Routes } from '@angular/router';
import { Navegador } from './componentes/compartido/navegador/navegador';
import { Principal } from './componentes/paginas/principal/principal';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "principal",
        pathMatch: "full"
    },
    {
        path: "principal",
        component: Principal,
        title: "pagina | principal"
    }
];
