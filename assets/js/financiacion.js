/*
SISTEMA DE FINANCIACIÓN
Proyecto que hace una Financiación de cuotas
*/

//Definir las Clases
const unidades = [
    {numeroUnidad: 1,torre: 'Torre 1', piso: 'PB', unidad: 'A'},
    {numeroUnidad: 2,torre: 'Torre 1', piso: 'PB', unidad: 'B'},
    {numeroUnidad: 3,torre: 'Torre 1', piso: 'PB', unidad: 'C'},
    {numeroUnidad: 4,torre: 'Torre 1', piso: '01', unidad: 'A'},
    {numeroUnidad: 5,torre: 'Torre 1', piso: '01', unidad: 'B'},
    {numeroUnidad: 6,torre: 'Torre 1', piso: '01', unidad: 'C'},
    {numeroUnidad: 7,torre: 'Torre 1', piso: '02', unidad: 'A'},
    {numeroUnidad: 8,torre: 'Torre 1', piso: '02', unidad: 'B'},
    {numeroUnidad: 9,torre: 'Torre 1', piso: '02', unidad: 'C'},
    {numeroUnidad: 10,torre: 'Torre 1', piso: '03', unidad: 'A'},
    {numeroUnidad: 11,torre: 'Torre 1', piso: '03', unidad: 'B'},
    {numeroUnidad: 12,torre: 'Torre 1', piso: '03', unidad: 'C'},
    {numeroUnidad: 13,torre: 'Torre 1', piso: '04', unidad: 'A'},
    {numeroUnidad: 14,torre: 'Torre 1', piso: '04', unidad: 'B'},
    {numeroUnidad: 15,torre: 'Torre 1', piso: '04', unidad: 'C'},
    {numeroUnidad: 16,torre: 'Torre 1', piso: '05', unidad: 'A'},
    {numeroUnidad: 17,torre: 'Torre 1', piso: '05', unidad: 'B'},
    {numeroUnidad: 18,torre: 'Torre 1', piso: '05', unidad: 'C'},
    {numeroUnidad: 19,torre: 'Torre 1', piso: '05', unidad: 'A'},
    {numeroUnidad: 20,torre: 'Torre 1', piso: '05', unidad: 'B'},
    {numeroUnidad: 21,torre: 'Torre 1', piso: '05', unidad: 'C'},
]

const interes = 0.01;
let num
let nombre
let archivoBoletos = []

class Boleto {
    constructor (numeroBoleto, unidad, cliente, montoFinanciar, numeroCuotas){
        this.numeroBoleto = numeroBoleto;
        this.unidad = unidad;
        this.cliente = cliente;
        this.montoFinanciar = montoFinanciar;
        this.numeroCuotas = numeroCuotas;
    }
}

// Función que agrega un nuevo Boleto

const agregar = () => {
    //variable para alojar el retorno de la funcion del objeto.
        Swal.fire ( {
            title: '¿Desea cargar un nuevo Boleto?',
            showCancelButton: true,
            confirmButtonText: 'Si quiero',
            cancelButtonText: 'No quiero'
        }).then((result) => {
            if(result.isConfirmed){
                let unidad = parseInt( prompt('Ingrese el número de la unidad',0) );
                verificarUnidad(unidad);
                    function verificarUnidad (num){
                        if (!isNaN(num) && num>0){
                            //console.log ('El valor : ' + num + ' es un número')
                        }
                        
                        else{
                            mensaje = alert('Debes ingresar un numero');
                            num = parseInt ( prompt('Ingrese el número de la unidad',0) );
                            unidad = num
                            verificarUnidad(num);
                        }
                    }
                
                let cliente = prompt('Ingrese el Apellido y Nombre del Cliente');
                verificarNombre (cliente);
                    function verificarNombre (nombre){
                        if (nombre.length >= 1){
                            //console.log ('El valor : ' + num + ' es un número')
                        }
                        
                        else{
                            mensaje = alert('Debes ingresar un cliente');
                            nombre = prompt('Ingrese el Apellido y Nombre del Clientee',0);
                            cliente = nombre
                            verificarNombre(nombre);
                        }
                    }


                let montoFinanciar = parseInt ( prompt('Ingrese el Monto a Financiar',0) );
                verificarMontoFinanciar(montoFinanciar);
                    function verificarMontoFinanciar (num){
                        if (!isNaN(num) && num>0){
                            //console.log ('El valor : ' + num + ' es un número')
                        }
                        
                        else{
                            mensaje = alert('Debes ingresar un numero');
                            let num = parseInt ( prompt('Ingrese el Monto a Financiar',0) );
                            montoFinanciar = num
                            verificarMontoFinanciar (num);
                        }
                    }
                    
                let numeroCuotas = parseInt ( prompt('Ingrese la Cantidad de Cuotas',1) );
                verificarNumeroCuotas(numeroCuotas);
                    function verificarNumeroCuotas (num){
                        if (!isNaN(num) && num>0){
                            //console.log ('El valor : ' + num + ' es un número')
                        }
                        
                        else{
                            mensaje = alert('Debes ingresar un numero');
                            let num = parseInt ( prompt('Ingrese la Cantidad de Cuotas',0) );
                            numeroCuotas = num
                            verificarNumeroCuotas (num);
                        }
                    }

                    const objetoUnidad = unidades.find (producto =>{
                        return producto.numeroUnidad === unidad;
                    })
                
                archivoBoletos = JSON.parse(localStorage.getItem('boletos'));

                let nuevoBoleto = new Boleto (generarBoleto(), objetoUnidad, cliente, montoFinanciar, numeroCuotas)
                archivoBoletos.push(nuevoBoleto); 
                sincronizarConLocalStorage(archivoBoletos)
                representaArreglo(archivoBoletos);
                
                console.log('Financiación: ')
                console.log(nuevoBoleto)
                for( let i=1; i<=numeroCuotas; i++){
                    let numeroCuota = i
                    let valorCuota = (montoFinanciar / numeroCuotas)* (1+interes) ** (i-1);
                    console.log('Nº Cuota: '+ numeroCuota + ' / Valor de Cuota: ' + valorCuota.toFixed(2))
                }
                confirm("La financiación se muestra por consola")
            }
        })
}



//FUNCIONES

// Función que muestra los datos de ejemplo al cargar la página.
const iniciado = () => {
    console.log('Iniciamos')
    let storageBoletos = JSON.parse(localStorage.getItem('boletos'));
    storageBoletos == null && sincronizarConLocalStorage (archivoBoletos)
    archivoBoletos = JSON.parse(localStorage.getItem('boletos'));
    representaArreglo(archivoBoletos);    
};

// Función sincronizar los Boletos
function sincronizarConLocalStorage(arr){
    localStorage.setItem("boletos", JSON.stringify(arr));
};

// Función que genera un ID consecutivo
const generarBoleto = () =>{
    let nuevoBoleto = 1;
    if(archivoBoletos.length > 0) nuevoBoleto = archivoBoletos[archivoBoletos.length - 1].numeroBoleto + 1;
    return nuevoBoleto;
};


const limpiarCuerpo = () => {
    document.getElementById('Tabla1').innerHTML= `
        <thead>
            <tr>
                <th>Boleto</th>
                <th>Unidad</th>
                <th>Cliente</th>
                <th>Monto</th>
                <th>Cuotas</th>
                <th>Cuota Inicial</th>
            </tr>
            </tr>
        </thead>
        <tbody id="body">
            <!--Contenido de la tabla-->
        </tbody>`
};


// Función que muestra los datos en la tabla.

const mostrarEnTabla = (numeroBoleto, datosUnidad, cliente, montoFinanciar, numeroCuotas) =>{ 
    document.getElementById('Tabla1').insertRow(-1).innerHTML = 
        `<tr>
            <td>${numeroBoleto}</td>
            <td>${datosUnidad}</td>
            <td>${cliente}</td>
            <td>${montoFinanciar.toFixed(2)}</td>
            <td>${numeroCuotas}</td>
            <td>${(montoFinanciar / numeroCuotas).toFixed(2)}</td>
        </tr>`
};

/*A incorporar mas adelante
<td class="text-center "><a id="eliminar_${numeroBoleto}"class="borrarBoleto" data-id="1">X</a></td>
<td class="text-center "><a id="ver_${numeroBoleto}"class="verBoleto" data-id="1">¿?</a></td>
*/


// Función que borra la tabla, luego muestra el arreglo parámetro en ella (indirectamente).
const representaArreglo = (arreglo) => {
    limpiarCuerpo();
    arreglo.forEach(objeto => {
        mostrarEnTabla(objeto.numeroBoleto,[`${objeto.unidad.torre} ${objeto.unidad.piso} ${objeto.unidad.unidad}`],objeto.cliente,objeto.montoFinanciar,objeto.numeroCuotas);
    });
    archivoBoletos.splice(0,archivoBoletos.length)
    
};


// Función que elimina un trabajo de impresión de la lista según su ID. Luego actualiza la tabla para mostrarlo (indirectamente).

const eliminar = () => {
    let objetivo = 0;
    do{
        objetivo = prompt("Ingrese el índice del registro a eliminar");
    }while (isNaN(objetivo));
    archivoBoletos = JSON.parse(localStorage.getItem('boletos'));
    if(confirm("Está seguro que quiere eliminarlo?")) { //SEGUIR ACA
        if(!(archivoBoletos.find(elemento => elemento.numeroBoleto == objetivo)===undefined)){
            archivoBoletos.splice(archivoBoletos.indexOf(archivoBoletos.find(elemento => elemento.numeroBoleto == objetivo)),1);
            sincronizarConLocalStorage (archivoBoletos)
            representaArreglo(archivoBoletos);
            alert("Boleto eliminado");
        }else{
            alert("El Boleto no existe");
        }
    }
};


// Función que busca un registro según el contenido del cuadro de búsqueda. Muestra el arreglo resultante (indirectamente).

const buscar = () => {
    let objetivo =  document.getElementById('buscarBoleto').value
    objetivo = objetivo.toUpperCase();
    archivoBoletos = JSON.parse(localStorage.getItem('boletos'));
    representaArreglo(archivoBoletos.filter(elemento => elemento.unidad == objetivo || elemento.numeroBoleto == objetivo || elemento.cliente.toUpperCase().includes(objetivo) || elemento.unidad.torre.toUpperCase().includes(objetivo) || elemento.unidad.piso.toUpperCase().includes(objetivo) || elemento.unidad.unidad.toUpperCase().includes(objetivo) ));
}
