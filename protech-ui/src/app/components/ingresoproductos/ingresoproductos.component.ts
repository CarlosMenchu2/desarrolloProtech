import { Component, OnInit } from '@angular/core';
import { ImagenesproductoService } from '../../services/imagenesproducto.service';
import { MarcasService } from '../../services/marcas.service';
import { CategoriasService } from '../../services/categorias.service';
import { ProductoService } from '../../services/producto.service';
import { CatalagoService } from '../../services/catalago.service';
//componentes de form
declare var $: any;



@Component({
  selector: 'app-ingresoproductos',
  templateUrl: './ingresoproductos.component.html',
  styleUrls: ['./ingresoproductos.component.css']
})
export class IngresoproductosComponent implements OnInit {
  //marcas: any[] = ['Marca 1', 'Marca 2', 'Marca 3'];
  //categorias: any[] = ['Categoría 1', 'Categoría 2', 'Categoría 3'];
  marcas: any[]; //Arreglo para retener marcas
  categorias: any[]; //Arreglo para retener categorías
  //Arreglos de imágenes para ingreso y modificación
  urls = new Array<string>(); //Arreglo para retener las imágenes que se van a ingresar
  murls = new Array<string>(); //Arreglo para retener las imágenes que se van a ingresar
  //Arreglos de imágenes auxiliares para ingreso y modificación
  imagenes = new Array<any>(); //Arreglo auxiliar que retiene las imágenes a ingresar
  mimagenes = new Array<any>(); //Arreglo auxiliar que retiene las imágenes a ingresar
  //Strings de especificaciones para ingreso y modificación
  sEspecificaciones: string = ''; //String completo de especificaciones
  msEspecificaciones: string = ''; //String completo de especificaciones
  //Arreglos de espeficaciones para ingreso y modificación
  especificaciones = new Array<string>(); //Array debidamente separado de las especificaciones
  mespecificaciones = new Array<string>(); //Array debidamente separado de las especificaciones
  //Booleano para ingreso y modificación
  //false = no hay descuento
  //true = hay descuento
  booleano = false;//Booleano que verifica si hay que ingresar descuento o no
  mbooleano = false;//Booleano que verifica si hay que ingresar descuento o no
  //Indice de especificaciones para ingreso y modificación
  indiceEspecificaciones: number = 0;
  mindiceEspecificaciones: number = 0;
  //Arrays para ingreso y modificación
  //campos[0] = producto
  //campos[1] = descripcion
  //campos[2] = marca
  //campos[3] = categoría
  //campos[4] = precio de venta
  //campos[5] = existencia
  //campos[6] = % descuento
  campos: string[] = ['', '', '', '', '', '', ''];//Array para tener control de los campos a ingresar
  mcampos: string[] = ['', '', '', '', '', '', ''];//Array para tener control de los campos a ingresar
  //Booleano para ingreso y modificación
  //banderaradio = 1 (disponible)
  //banderaradio = 2 (descontinuado)
  banderaradio = 0;//Controlar si se seleccionó el rb de disponible o descontinuado
  mbanderaradio = 0;//Controlar si se seleccionó el rb de disponible o descontinuado
  arregloPaginas: any = [];//Controlar cuántas páginas tiene el get
  numPaginas: number;//Controlar el conteo de productos que me regresa una página
  arregloProductos: any[] = []; //Obtener los productos dependiendo de la página solicitada
  modificar = 0;
  posicion = 0;
  mlongitudImagenes = 0;
  posEliminar = 0;

  constructor(private imagenesService: ImagenesproductoService, private marcasService:MarcasService, 
    private categoriasService:CategoriasService, private productoService: ProductoService, private catalogoService:
    CatalagoService) {

    this.marcasService.getMarcas()//Obtener marcas para arreglo de marcas
      .subscribe( (dataMarcas: any) => {
        this.marcas = dataMarcas;
      });
    this.categoriasService.getCategorias()//Obtener categorías para arreglo de categorías
      .subscribe( (dataCategorias: any) => {
        this.categorias = dataCategorias;
      });
    $('#myModal').modal({backdrop: 'static', keyboard: false})
  }

  manipularBRadio(valor){//Asignar valor a la bandera dependiendo del rb seleccionado (ingreso)
    this.banderaradio = valor;
  }
  mmanipularBRadio(valor){//Asignar valor a la bandera dependiendo del rb seleccionado (modificación)
    this.mbanderaradio = valor;
  }

  ngOnInit(): void {//Avisar si se han ingresado más de 3 imágenes
    this.validarImagenes();
    this.mvalidarImagenes();
  }
  //Si no se ingresaron todas las imágenes (o ninguna), poner imágenes por defecto (ingreso)
  validarImagenes(){
    for (let i = 0; i < 3; i++)
    {
      if (this.urls[i] === null || this.urls[i] !== 'assets/img/Interrogación.png')
      {
        this.urls[i] = 'assets/img/Interrogación.png';
      }
    }
  }
  //Si no se ingresaron todas las imágenes (o ninguna), poner imágenes por defecto (modificación)
  mvalidarImagenes(){
    for (let i = 0; i < 3; i++)
    {
      if (this.murls[i] === null || this.murls[i] !== 'assets/img/Interrogación.png')
      {
        this.murls[i] = 'assets/img/Interrogación.png';
      }
    }
  }
  
  bandera()//Validar campos con regex en ingreso
  {
    //Validar que todos los campos (sin incluir los checkbox ni radios) no estén vacíos
    for (let i = 0; i < this.campos.length-1; i++)
    {
      if (this.campos[i] != null)
      {
        if (this.campos[i].length === 0)
        {
          return false;
        }
      }
      else{
        return false;
      }
    }
    //Validar que al menos un radio-button esté seleccionado
    if (this.banderaradio === 0)
    {
      return false;
    }
    //Validar que, si el checkbox de descuento está seleccionado, que su campo de texto no esté vacío
    if (this.booleano === true)
    {
      if (this.campos[5].length === 0 || this.campos[5] === null)
      {
        return false;
      }
    }
    //Verificar que los campos de precio y existencia cumplan con los regex especificados
    var regexexistencia = /^\d*$/;
    var regexprecio = /^\d+(?:\.\d{1,2})?$/ ;
    var regexdescuento = /^\d{1,2}$/;
    var existencia = regexexistencia.exec((<HTMLInputElement>document.getElementById("existencia")).value);
    var precio = regexprecio.exec((<HTMLInputElement>document.getElementById("precioVenta")).value);
    
    if (!existencia || !precio)
    {
      return false;
    }
    if (this.booleano === true)
    {
      var descuento = regexdescuento.exec((<HTMLInputElement>document.getElementById("inputDescuento")).value);
      if (!descuento)
      {
        return false;
      }
    }
    //Si todos los casos anteriores se dieron, entonces retornar true
    return true;
  }

  mbandera()//Validar campos con regex en modificación
  {
    //Validar que todos los campos (sin incluir los checkbox ni radios) no estén vacíos
    for (let i = 0; i < this.mcampos.length-1; i++)
    {
      if (this.mcampos[i] != null)
      {
        if (this.mcampos[i].length === 0)
        {
          return false;
        }
      }
      else{
        return false;
      }
    }
    //Validar que al menos un radio-button esté seleccionado
    if (this.mbanderaradio === 0)
    {
      return false;
    }
    //Validar que, si el checkbox de descuento está seleccionado, que su campo de texto no esté vacío
    if (this.mbooleano === true)
    {
      if (this.mcampos[5].length === 0 || this.campos[5] === null)
      {
        return false;
      }
    }
    //Verificar que los campos de precio y existencia cumplan con los regex especificados
    var regexexistencia = /^\d*$/;
    var regexprecio = /^\d+(?:\.\d{1,2})?$/ ;
    var regexdescuento = /^\d{1,2}$/;
    var existencia = regexexistencia.exec((<HTMLInputElement>document.getElementById("mexistencia")).value);
    var precio = regexprecio.exec((<HTMLInputElement>document.getElementById("mprecioVenta")).value);
    
    if (!existencia || !precio)
    {
      return false;
    }
    if (this.booleano === true)
    {
      var descuento = regexdescuento.exec((<HTMLInputElement>document.getElementById("minputDescuento")).value);
      if (!descuento)
      {
        return false;
      }
    }
    //Si todos los casos anteriores se dieron, entonces retornar true
    return true;
  }
  //Refrescar página al ingresar o modificar el producto
  refrescarPagina()
  {
    location.reload();
  }
  //Verificar regex en especificación ingresada (ingreso)
  obtenerEspecificacion(){
    var re = /[0-9a-zA-ZÀ-ÿ\s\u00f1\u00d1:.;!#$%&/()=?¡¿/*+>_-]$/;
    var input = re.exec((<HTMLInputElement>document.getElementById("especificacion")).value);
    var longitud = (<HTMLInputElement>document.getElementById("especificacion")).value;
    //Verificar si el regex se cumple y si la longitud de la cadena total no pasa de 800 caracteres
    if (input && (this.validarLongitud() + longitud.length) <= 800)
    {
      var valor = (<HTMLInputElement>document.getElementById("especificacion")).value;
      this.especificaciones.push(valor);
      (<HTMLInputElement>document.getElementById("especificacion")).value = '';
      this.crearEspecificaciones();
    }
    else if (!input)//Si no se cumple el regex, avisar el motivo
    {
      alert("Ingrese letras, números y SOLO los caracteres especiales especificados: :.;!#$%&/()=?¡¿/*-+>_ (no ingrese comas, importante)")
    }
    else if (this.validarLongitud() === 800) //Si ya se completó el límite de caracteres, avisar
    {
      alert("Ya no puede ingresar más especificaciones");
    }
    else if ((this.validarLongitud() + longitud.length) > 800) //Si se va a ingresar una especificación y la cadena pasa de 800 caracteres, avisar
    {
      alert("Ya no puede ingresar más especificaciones (a menos que la siguiente especificación tenga " + (800-this.validarLongitud()) + " letras)");
    }
    else//Si hay algún otro motivo por el cual la especificación se ingresó mal, avisar
    {
      alert("Especificación mal ingresada");
    }
  }
  //Verificar regex en especificación ingresada (modificación)
  mobtenerEspecificacion(){
    var re = /[0-9a-zA-ZÀ-ÿ\s\u00f1\u00d1:.;!#$%&/()=?¡¿/*+>_-]$/;
    var input = re.exec((<HTMLInputElement>document.getElementById("mespecificacion")).value);
    var longitud = (<HTMLInputElement>document.getElementById("mespecificacion")).value;
    //Verificar si el regex se cumple y si la longitud de la cadena total no pasa de 800 caracteres
    if (input && (this.mvalidarLongitud() + longitud.length) <= 800)
    {
      var valor = (<HTMLInputElement>document.getElementById("mespecificacion")).value;
      this.mespecificaciones.push(valor);
      (<HTMLInputElement>document.getElementById("mespecificacion")).value = '';
      this.mcrearEspecificaciones();
    }
    else if (!input)//Si no se cumple el regex, avisar el motivo
    {
      alert("Ingrese letras, números y SOLO los caracteres especiales especificados: :.;!#$%&/()=?¡¿/*-+>_ (no ingrese comas, importante)")
    }
    else if (this.mvalidarLongitud() === 800) //Si ya se completó el límite de caracteres, avisar
    {
      alert("Ya no puede ingresar más especificaciones");
    }
    else if ((this.mvalidarLongitud() + longitud.length) > 800) //Si se va a ingresar una especificación y la cadena pasa de 800 caracteres, avisar
    {
      alert("Ya no puede ingresar más especificaciones (a menos que la siguiente especificación tenga " + (800-this.validarLongitud()) + " letras)");
    }
    else//Si hay algún otro motivo por el cual la especificación se ingresó mal, avisar
    {
      alert("Especificación mal ingresada");
    }
  }
  //Función para validar la longitud total del string de especificaciones (ingreso)
  validarLongitud()
  {
    var longitud = 0;
    for (let i = 0; i < this.especificaciones.length; i++)
    {
      longitud = longitud + this.especificaciones[i].length;
    }
    return longitud;
  }
  //Función para validar la longitud total del string de especificaciones (modificación)
  mvalidarLongitud()
  {
    var longitud = 0;
    for (let i = 0; i < this.mespecificaciones.length; i++)
    {
      longitud = longitud + this.mespecificaciones[i].length;
    }
    return longitud;
  }
  //Actualizar string de especificaciones para su posterior separación (ingreso)
  crearEspecificaciones()
  {
    this.sEspecificaciones = '';
    for (let i = 0; i < this.especificaciones.length; i++)
    {
      if (i === this.especificaciones.length - 1)
      {
        this.sEspecificaciones = this.sEspecificaciones + this.especificaciones[i];
        console.log(this.sEspecificaciones);
      }
      else
      {
        this.sEspecificaciones = this.sEspecificaciones + this.especificaciones[i] + ', ';
      }
    }
  }
  //Actualizar string de especificaciones para su posterior separación (modificación)
  mcrearEspecificaciones()
  {
    this.msEspecificaciones = '';
    for (let i = 0; i < this.mespecificaciones.length; i++)
    {
      if (i === this.mespecificaciones.length - 1)
      {
        this.msEspecificaciones = this.msEspecificaciones + this.mespecificaciones[i];
        console.log(this.msEspecificaciones);
      }
      else
      {
        this.msEspecificaciones = this.msEspecificaciones + this.mespecificaciones[i] + ', ';
      }
    }
  }
  //Obtener las especificaciones de un producto al modificar
  obtenerEspecificaciones(){
    for (let i = 0; i < this.msEspecificaciones.split(',').length; i++)
    {
      this.mespecificaciones[i] = this.msEspecificaciones.split(',')[i];
    }
  }

  //Manipular posición del arreglo de especificaciones para su posterior modificación
  manipularVector(accion: number)
  {
    if (accion === 0)
    {
      if (this.indiceEspecificaciones < (this.especificaciones.length-1))
      {
        this.indiceEspecificaciones = this.indiceEspecificaciones + 1;
      }
      
    }
    else
    {
      if (this.indiceEspecificaciones > 0)
      {
        this.indiceEspecificaciones = this.indiceEspecificaciones - 1;
      }
    }
  }
  //Manipular posición del arreglo de especificaciones para su posterior modificación
  mmanipularVector(accion: number)
  {
    if (accion === 0)
    {
      if (this.mindiceEspecificaciones < (this.mespecificaciones.length-1))
      {
        this.mindiceEspecificaciones = this.mindiceEspecificaciones + 1;
      }
      
    }
    else
    {
      if (this.mindiceEspecificaciones > 0)
      {
        this.mindiceEspecificaciones = this.mindiceEspecificaciones - 1;
      }
    }
  }
  //Asignar valor booleano (true) si se seleccionó el cb de descuento, de lo contrario asignar false (ingreso)
  asignarValor(){
    this.booleano = (<HTMLInputElement>document.getElementById('cbDescuento')).checked;
    if (this.booleano === false)
    {
      this.campos[6] = '0';
    }
  }
  //Asignar valor booleano (true) si se seleccionó el cb de descuento, de lo contrario asignar false (modificación)
  masignarValor(){
    this.mbooleano = (<HTMLInputElement>document.getElementById('mcbDescuento')).checked;
    if (this.mbooleano === false)
    {
      this.mcampos[6] = '0';
    }
  }
  //Eliminar especificaciones ingresadas (ingreso)
  eliminarEspecificaciones()
  {
    this.especificaciones.splice(this.indiceEspecificaciones, 1);
    if (this.indiceEspecificaciones > 0)
    {
      this.indiceEspecificaciones = this.indiceEspecificaciones - 1;
    }
    this.crearEspecificaciones();
  }
  //Eliminar especificaciones ingresadas (modificación)
  meliminarEspecificaciones()
  {
    this.mespecificaciones.splice(this.mindiceEspecificaciones, 1);
    if (this.mindiceEspecificaciones > 0)
    {
      this.mindiceEspecificaciones = this.mindiceEspecificaciones - 1;
    }
    this.mcrearEspecificaciones();
  }
  //Asignar las imágenes que se van a ingresar al array urls, para luego mostrar dichas imágenes (ingreso)
  detectFiles(event)
  {
    
    let files = event.target.files;
    let posicion = 0;
    if (event.target.files.length > 3)
    {
      alert("Usted ha ingresado más de 3 imágenes, así que se ingresarán al servidor las primeras 3 imágenes ingresadas únicamente.");
    }
    if (files) {
      
      for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            if (posicion < 3)
            {
              this.urls[posicion] = e.target.result;
              posicion = posicion + 1;
            }
          }
          reader.readAsDataURL(file);
      }
    }
    this.validarImagenes();
  }
  //Asignar las imágenes que se van a ingresar al array urls, para luego mostrar dichas imágenes (modificación)
  mdetectFiles(event)
  {
    //(<HTMLInputElement>document.getElementById('mimage')).value = '';
    let files = event.target.files;
    let posicion = 0;
    this.mlongitudImagenes = event.target.files.length;
    if (event.target.files.length > 3)
    {
      alert("Usted ha ingresado más de 3 imágenes, así que se ingresarán al servidor las primeras 3 imágenes ingresadas únicamente.");
    }
    if (files) {
      for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            if (posicion < 3)
            {
              this.murls[posicion] = e.target.result;
              posicion = posicion + 1;
            }
          }
          reader.readAsDataURL(file);
      }
    }
    this.mvalidarImagenes();
  }

  //Asignar imágenes con el vector auxiliar (ingreso)
  asignarImagenes(event){
    let aux = 0;
    while (aux < event.target.files.length)
    {
      this.imagenes[aux] = event.target.files[aux];
      aux = aux + 1;
    }
  }
  //Asignar imágenes con el vector auxiliar (modificación)
  masignarImagenes(event){
    let aux = 0;
    while (aux < event.target.files.length)
    {
      this.mimagenes[aux] = event.target.files[aux];
      aux = aux + 1;
    }
  }
  //Ingresar imágenes a producto ingresado
  ingresarImagenes(id: any)
  {
    for (let i = 0; i < 3; i++)
    {
      if (this.urls[i] === null || this.urls[i] !== 'assets/img/Interrogación.png'){
        this.imagenesService.postImagen(this.imagenes[i], id).subscribe(
          (res) => console.log(res),
          (err) => console.log(err),
          );
      }
    }
    $('#myModal').modal('show');
  }

  modificarImagenes(id: any)
  {
    if (this.mlongitudImagenes > 0)
    {
      //Eliminar todas las imágenes
      for (let i = 0; i < this.arregloProductos[this.posicion].imagenes.length; i++)
      {
        this.imagenesService.deleteImagen(this.arregloProductos[this.posicion].imagenes[i]._id).subscribe(
          (res) => console.log(res),
          (err) => console.log(err),
          );
      }
      //Ingreso de nuevas imágenes
      for (let i = 0; i < 3; i++)
      {
        if (this.murls[i] === null || this.murls[i] !== 'assets/img/Interrogación.png'){
        this.imagenesService.postImagen(this.mimagenes[i], id).subscribe(
          (res) => console.log(res),
          (err) => console.log(err),
          );
        }
      }
    }
    $('#myModal').modal('show');
  }

  //Ingresar producto con sus respectivos campos
  ingresarProducto()
  {
    let id;
    let mid = this.marcas[(<HTMLSelectElement>document.getElementById('marca')).selectedIndex-1]._id;
    let cid = this.categorias[(<HTMLSelectElement>document.getElementById('categoria')).selectedIndex-1]._id;
    this.productoService.postProducto(this.campos, this.banderaradio, this.booleano, this.sEspecificaciones, mid, cid).subscribe(
      (producto: any) => {
        id = producto.producto._id;
        this.ingresarImagenes(id);
        console.log(producto);
      },
      (err) => console.log(err),
    );
  }

  modificarProducto()
  {
    let id = this.arregloProductos[this.posicion]._id;
    let mid = this.marcas[(<HTMLSelectElement>document.getElementById('mmarca')).selectedIndex-1]._id;
    let cid = this.categorias[(<HTMLSelectElement>document.getElementById('mcategoria')).selectedIndex-1]._id;
    this.productoService.putProducto(id, this.mcampos, this.mbanderaradio, this.mbooleano, this.msEspecificaciones, mid, cid).subscribe(
      (producto: any) => {
        this.modificarImagenes(id);
        console.log(producto);
      },
      (err) => console.log(err),
    );
  }

  eliminarProducto()
  {
    let id = this.arregloProductos[this.posEliminar]._id;
    this.productoService.deleteProducto(id).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  posicionEliminar(eliminar: any)
  {
    this.posEliminar = eliminar;
  }
  //Obtener el total de páginas para efectuar la consulta correspondiente
  obtenerPaginas(): void{
    let posicion = (<HTMLSelectElement>document.getElementById('Fcategoria')).selectedIndex-1;
    this.arregloPaginas = [];
    if (posicion >= 0)
    {
      let cnombre = this.categorias[posicion]._id;
      this.catalogoService.getProductos2(cnombre)
      .subscribe( (dataPaginacion: any) => {
        this.numPaginas = dataPaginacion.count;
        this.numPaginas = Math.ceil( this.numPaginas / 10);
        for (let i = 1; i <= this.numPaginas; i++){
          this.arregloPaginas.push(i);
        }
      });
    }
    else
    {
      this.arregloProductos = [];
      this.arregloPaginas = [];
    }
  }
  //Aplicar filtros de productos dependiendo del número de página solicitado
  aplicarFiltros(termino = 1): void{
    let posicion = (<HTMLSelectElement>document.getElementById('Fcategoria')).selectedIndex-1;
    if (posicion >= 0)
    {
      let cnombre = this.categorias[posicion]._id;
      this.catalogoService.getProductos2(cnombre, '',-1,-1, termino)
      .subscribe( (dataProductosFiltrados: any) => {
        this.arregloProductos = dataProductosFiltrados.productos;
      });
      this.obtenerPaginas();
    }
    else
    {
      this.arregloProductos = [];
      this.arregloPaginas = [];
    }
  }
  //Mantener control de cuando se busca un producto o cuando se modifica uno de estos
  modificarValores(numero: number)
  {
    this.modificar = numero;
  }
  //Asignar campos a componentes al momento de confirmar la modificación
  asignarValores(posicion: number){
    this.posicion = posicion;
    this.mcampos[0] = this.arregloProductos[posicion].nombre;
    this.mcampos[1] = this.arregloProductos[posicion].descripcion;
    this.mcampos[2] = this.arregloProductos[posicion].marca.nombre;
    this.mcampos[3] = this.arregloProductos[posicion].categoria.nombre;
    this.mcampos[4] = this.arregloProductos[posicion].precio;
    this.mcampos[5] = this.arregloProductos[posicion].existencia;
    this.mcampos[6] = this.arregloProductos[posicion].porcenjateOferta;
    this.msEspecificaciones = this.arregloProductos[posicion].especificacion;
    this.obtenerEspecificaciones();
    if(this.arregloProductos[posicion].disponible === true)
    {
      this.mbanderaradio = 1;
    }
    else
    {
      this.mbanderaradio = 2;
    }
    if(this.arregloProductos[posicion].ofertado === true)
    {
      this.mbooleano = true;
    }
    else
    {
      this.mbooleano = false;
    }
    for (let i = 0; i < this.arregloProductos[posicion].imagenes.length; i++)
    {
      this.murls[i] = this.arregloProductos[posicion].imagenes[i].url;
    }
    
  }
}