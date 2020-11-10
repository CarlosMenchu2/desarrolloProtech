/* import { RouterModule, Routes } from '@angular/router';
import { CarritocompraComponent } from './components/carritocompra/carritocompra.component';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones.component';

const APP_ROUTES: Routes = [
    { path: 'carritocompra', component: CarritocompraComponent },
    { path: 'configuraciones', component: ConfiguracionesComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'carritocompra' },
    { path: '**', pathMatch: 'full', redirectTo: 'configuraciones' }

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true }); */

import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
/* import { TarjetasProductosComponent } from './components/tarjetas-productos/tarjetas-productos.component' */
import { DetalleproductoComponent } from './components/detalleproducto/detalleproducto.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { PaginainicioComponent } from "./components/paginainicio/paginainicio.component";
import { HowbuyComponent } from "./components/howbuy/howbuy.component";
import { ContactpageComponent } from "./components/contactpage/contactpage.component";
import { CarritocompraComponent} from "./components/carritocompra/carritocompra.component";
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones.component';
import { HistorialComprasComponent } from './components/historial-compras/historial-compras.component';
import { IngresoproductosComponent } from './components/ingresoproductos/ingresoproductos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
/* importa el guardia de ruta */
import { AuthHistorialGuard } from './guards/auth-historial.guard';


const app_routes: Routes = [
  { path: 'catalogo/:id', component: CatalogoComponent },
  { path: 'detalle/:id', component: DetalleproductoComponent },
  { path: 'carritocompra/:id/:cantidad', component: CarritocompraComponent },
  { path: 'home', component: PaginainicioComponent},
  { path: 'nosotros', component: AboutusComponent},
  { path: 'inventario', component: IngresoproductosComponent},
  { path: 'reportes', component: ReportesComponent},
  { path: 'comprar', component: HowbuyComponent},
  { path: 'contacto', component: ContactpageComponent},
  { path: 'carritocompra', component: CarritocompraComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'configuraciones', component: ConfiguracionesComponent },
  { path: 'historialcompras', component: HistorialComprasComponent, canActivate: [AuthHistorialGuard] },
  { path: 'ingresoproductos', component: IngresoproductosComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
