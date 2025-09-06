import { Routes } from '@angular/router';
import { Principal } from './componentes/paginas/principal/principal';
import { PaginaPDF } from './componentes/paginas/pagina-pdf/pagina-pdf';

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
    },
    {
        path: "pagina-pdf",
        component: PaginaPDF,
        title: "pagina | pagina-pdf"
    },
];
