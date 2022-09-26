/*
SISTEMA DE FINANCIACIÓN
Proyecto que hace una Financiación de cuotas
*/

//Definir las Clases
class Cliente {
    constructor (cliente, financiacion){
        this.cliente = cliente;
        this.financiacion = financiacion;
    }
}

class DatosCliente {
    constructor (nombre, dni){
        this.nombre = nombre;
        this.dni = dni;
    }
}

class DatosFinanciacion {
    constructor (montoFinanciar, numeroCuotas, interes){
        this.montoFinanciar = montoFinanciar;
        this.numeroCuotas = numeroCuotas;
        this.cuotaInicial = montoFinanciar / numeroCuotas;
        this.interes = interes
    }
}


// Introducir los valores por el Usuario
const interes = 0.01;
let nombre = prompt('Ingrese el Apelllido y Nombre del Cliente');
let dni = parseInt ( prompt('Ingrese el DNI del Cliente',0) );
    verificarDni(dni);
let montoFinanciar = parseInt ( prompt('Ingrese el Monto a Financiar',0) );
    verificarMontoFinanciar(montoFinanciar);
let numeroCuotas = parseInt ( prompt('Ingrese la Cantidad de Cuotas',1) );
    verificarNumeroCuotas(numeroCuotas);



// Armar las clases    
let datosCliente1 = new DatosCliente(nombre, dni);
let datosFinanciacion1 = new DatosFinanciacion (montoFinanciar, numeroCuotas, interes);
let cliente1 = new Cliente (datosCliente1, datosFinanciacion1);
console.log(cliente1)


// Sistema de Financiación
document.write('<h1> Sistema de Financiación </h1>')
document.write(`<ul>
        <li>Nombre: ${nombre}</li>
        <li>DNI: ${dni}</li>
        <li>Monto a Financiar: ${montoFinanciar}</li>
        <li>Cantidad de Cuotas: ${numeroCuotas}</li>
        <li>Interes: ${interes*100}%</li>
        </ul>`)

for( let i=1; i<=numeroCuotas; i++){
    let numeroCuota = i
    let valorCuota = (montoFinanciar / numeroCuotas)* (1+interes) ** (i-1);
    console.log('Nº Cuota: '+ numeroCuota + ' / Valor de Cuota: ' + valorCuota)
    document.write(`Nº Cuota: ${numeroCuota} / Valor de Cuota: ${valorCuota} <br>`)
}

console.log('=====Fin=====')




//FUNCIONES
function verificarDni (num){
    if (!isNaN(num)){
        //console.log ('El valor : ' + num + ' es un número')
    }
    
    else{
        mensaje = alert('Debes ingresar un numero');
        let num = parseInt ( prompt('Ingrese el DNI del Cliente',0) );
        verificarDni(num);
    }
}

function verificarMontoFinanciar (num){
    if (!isNaN(num)){
        //console.log ('El valor : ' + num + ' es un número')
    }
    
    else{
        mensaje = alert('Debes ingresar un numero');
        let num = parseInt ( prompt('Ingrese el Monto a Financiar',0) );
        verificarMontoFinanciar (num);
    }
}

function verificarNumeroCuotas (num){
    if (!isNaN(num)){
        //console.log ('El valor : ' + num + ' es un número')
    }
    
    else{
        mensaje = alert('Debes ingresar un numero');
        let num = parseInt ( prompt('Ingrese la Cantidad de Cuotas',0) );
        verificarNumeroCuotas (num);
    }
}



