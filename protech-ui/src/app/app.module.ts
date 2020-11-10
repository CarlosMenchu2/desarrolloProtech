import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BnNgIdleService } from 'bn-ng-idle';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';

//Rutas
import { APP_ROUTING } from './app.routes';
//Servicios
import { MarcasService } from './services/marcas.service';
import { ProductosService } from './services/productos.service';
import { HistorialServiceService } from './services/historial-service.service';
import { CarritoUsuarioService } from './services/carrito-usuario.service';


//Componentes
import { AppComponent } from './app.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ContactpageComponent } from './components/contactpage/contactpage.component';
import { HowbuyComponent } from './components/howbuy/howbuy.component';
import { DetalleproductoComponent } from './components/detalleproducto/detalleproducto.component';
import { IngresoproductosComponent } from './components/ingresoproductos/ingresoproductos.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { TarjetasProductosComponent } from './components/tarjetas-productos/tarjetas-productos.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CarritocompraComponent } from './components/carritocompra/carritocompra.component';
import { PaginainicioComponent } from './components/paginainicio/paginainicio.component';
import { PanelprincipalComponent } from './components/panelprincipal/panelprincipal.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones.component';
import { ReportesComponent } from './components/reportes/reportes.component';

import { HttpClientModule } from '@angular/common/http';
import { HistorialComprasComponent } from './components/historial-compras/historial-compras.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { MensajeErrorComponent } from './components/shared/mensaje-error/mensaje-error.component';
import { RecuperarcontraseniaModule } from './components/recuperarcontrasenia/recuperarcontrasenia.module';

import { CheckoutService } from './services/checkout.service';



@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    TarjetasProductosComponent,
    FooterComponent,
    AboutusComponent,
    NavbarComponent,
    ContactpageComponent,
    HowbuyComponent,
    DetalleproductoComponent,
    IngresoproductosComponent,
    CarritocompraComponent,
    PaginainicioComponent,
    PanelprincipalComponent,
    PanelprincipalComponent,
    CheckoutComponent,
    ConfiguracionesComponent,
    HistorialComprasComponent,
    LoginComponent,
    RegistroComponent,
    MensajeErrorComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecuperarcontraseniaModule,
    APP_ROUTING,
    NgbModule,
    ChartsModule

  ],
  providers: [
    ProductosService,
    MarcasService,
    BnNgIdleService,
    CheckoutService,
    HistorialServiceService,
    CarritoUsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
