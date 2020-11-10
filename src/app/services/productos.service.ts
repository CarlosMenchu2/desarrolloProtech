import { Injectable } from '@angular/core';

@Injectable()
export class ProductosService {

    private productos:Producto[] = [
        {
            nombre: "Predator Helios 300",
            marca: "Acer",
            precio: 12000,
            img: "assets/img/products/predator.jpg"
        },
        {
            nombre: "Predator Helios 300",
            marca: "Acer",
            precio: 15000,
            img: "assets/img/products/predator.jpg"
        },
        {
            nombre: "Predator Helios 300",
            marca: "Acer",
            precio: 12099,
            img: "assets/img/products/predator.jpg"
        },
        {
            nombre: "A30",
            marca: "Samsung",
            precio: 1800,
            img: "assets/img/products/a30.jpg"
        }
    ]

    constructor(){
        console.log("Service ready");
    }

    getProductos():Producto[]{
        return this.productos;
    }
}

export interface Producto{
    nombre: string;
    marca: string;
    precio: number;
    img: string;
}