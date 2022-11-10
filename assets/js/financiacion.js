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
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si quiero',
        cancelButtonText: 'No quiero'
    })

// Solicitamos el número de Unidad
.then((result) => {
    
    if(result.isConfirmed){
        Swal.fire ( {
            title: 'Ingrese el número de la unidad',
            input: 'text',
            showCancelButton: true,
            inputValidator: (unidad) => {
                let numeroUnidad = parseInt(unidad)
                const validarUnidad = unidades.some( producto => producto.numeroUnidad === numeroUnidad )
                if(!numeroUnidad || isNaN(numeroUnidad) || numeroUnidad<0 || validarUnidad == false){
                    return 'Debes escribir un número o unidad valida'
                }
            }
        })

// Solicitamos Nombre del Cliente
.then((result) => {
    if(result.isConfirmed){
        let numeroUnidad = parseInt( result.value );
        Swal.fire ( {
            title: 'Ingrese el Apellido y Nombre del Cliente',
            input: 'text',
            showCancelButton: true,
            inputValidator: (nombre) => {
                if(!nombre){
                    return 'Debes escribir un nombre'
                }
            }
        })

// Solicitamos el monto a Financiar
.then((result) => {
    if(result.isConfirmed){
        let nombre = result.value;
        Swal.fire ( {
            title: 'Ingrese el monto a Financiar',
            input: 'text',
            showCancelButton: true,
            inputValidator: (monto) => {
                let montoFinanciar = parseInt(monto)
                if(!montoFinanciar || isNaN(montoFinanciar) || montoFinanciar<0){
                    return 'Debes escribir un número'
                }
            }
                
        })
//Solicitamos la cantidad de Cuotas        
.then((result) => {
    if(result.isConfirmed){
        let montoFinanciar = parseInt( result.value );
        Swal.fire ( {
            title: 'Ingrese la cantidad de Cuotas',
            input: 'text',
            showCancelButton: true,
            inputValidator: (cuotas) => {
                let cantCuotas = parseInt(cuotas)
                if(!cantCuotas || isNaN(cantCuotas) || cantCuotas<0){
                    return 'Debes escribir un número'
                }
            }
                
        })
// Cargamos los Datos del nuevo Boleto        
.then((result) => {
    if(result.isConfirmed){
        let cantCuotas = parseInt( result.value );                                          
        const objetoUnidad = unidades.find (producto =>{
            return producto.numeroUnidad === numeroUnidad;
        })
        
        archivoBoletos = JSON.parse(localStorage.getItem('boletos'));
    
        let nuevoBoleto = new Boleto (generarBoleto(), objetoUnidad, nombre, montoFinanciar, cantCuotas)
        archivoBoletos.push(nuevoBoleto); 
        sincronizarConLocalStorage(archivoBoletos)
        representaArreglo(archivoBoletos);
        
        console.log('Financiación: ')
        console.log(nuevoBoleto)
        for( let i=1; i<=cantCuotas; i++){
            let numeroCuota = i
            let valorCuota = (montoFinanciar / cantCuotas)* (1+interes) ** (i-1);
            console.log('Nº Cuota: '+ numeroCuota + ' / Valor de Cuota: ' + valorCuota.toFixed(2))
        }
        
        Swal.fire ( {
            title: 'Boleto Cargado',
            icon: 'success',
            showConfirmButton: false,
            timer:1500
        })
}
})
}
})
}
})
}
})
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
    representaInmuebles(unidades); 
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
                <th></th>
            </tr>
        </thead>
        <tbody id="tablaBoletos">
            <!--Contenido de la tabla-->
        </tbody>`

        document.getElementById('Tabla2').innerHTML= `
        <thead>
            <tr>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody id="tablaFinanciación">
            <!--Contenido de la tabla-->
        </tbody>`
};


// Función que muestra los inmuebles en el navBar.

const mostrarInmuebles = (numeroInmueble, datosUnidad) =>{ 
    document.getElementById('listaUnidades').insertRow(-1).innerHTML = 
        `<tr>
            <td>${numeroInmueble}</td>
            <td>${datosUnidad}</td>
        </tr>`
};

// Función que muestra los datos en la tabla.

const mostrarEnTabla = (numeroBoleto, datosUnidad, cliente, montoFinanciar, numeroCuotas) =>{ 
    document.getElementById('tablaBoletos').insertRow(-1).innerHTML = 
        `
            <tr>
                <td>${numeroBoleto}</td>
                <td>${datosUnidad}</td>
                <td>${cliente}</td>
                <td>${montoFinanciar.toFixed(2)}</td>
                <td>${numeroCuotas}</td>
                <td>${(montoFinanciar / numeroCuotas).toFixed(2)}</td>
                <td class="text-center delete"><a href="#" id="${numeroBoleto}" class="borrarBoleto" data-id="1">X</a></td>
                <td class="text-center view"><a href="#" id="${numeroBoleto}" class="verBoleto" data-id="1">?</a></td>
            </tr>
        `
};


/*A incorporar mas adelante
<td class="text-center "><a id="eliminar_${numeroBoleto}"class="borrarBoleto" data-id="1">X</a></td>
<td class="text-center "><a id="ver_${numeroBoleto}"class="verBoleto" data-id="1">¿?</a></td>
*/

// Función insertar los inmuebles en el NavBar.
const representaInmuebles = (arreglo) => {
    arreglo.forEach(objeto => {
        mostrarInmuebles(objeto.numeroUnidad,`${objeto.torre} ${objeto.piso} ${objeto.unidad}`);
    });
    archivoBoletos.splice(0,archivoBoletos.length)
    
};

// Función que borra la tabla, luego muestra el arreglo parámetro en ella (indirectamente).
const representaArreglo = (arreglo) => {
    limpiarCuerpo();
    arreglo.forEach(objeto => {
        mostrarEnTabla(objeto.numeroBoleto,[`${objeto.unidad.torre} ${objeto.unidad.piso} ${objeto.unidad.unidad}`],objeto.cliente,objeto.montoFinanciar,objeto.numeroCuotas);
    });
    archivoBoletos.splice(0,archivoBoletos.length)

    
    // Función que elimina un trabajo de impresión de la lista según su ID. Luego actualiza la tabla para mostrarlo (indirectamente).

    let buttonDelete = document.querySelectorAll('#tablaBoletos tr td.delete a');
    buttonDelete.forEach(element => {
        element.addEventListener('click',(e)=>{
            e.preventDefault();
            let id = e.target.id

            Swal.fire ( {
                title: '¿Está seguro que quiere eliminarlo??',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Si quiero',
                cancelButtonText: 'No quiero'
            }).then((result) => {
                if(result.isConfirmed){
                    archivoBoletos = JSON.parse(localStorage.getItem('boletos'));
                    archivoBoletos.splice(archivoBoletos.indexOf(archivoBoletos.find(elemento => elemento.numeroBoleto == id)),1);
                    sincronizarConLocalStorage (archivoBoletos)
                    representaArreglo(archivoBoletos);
                    
                    Swal.fire ( {
                        title: 'Boleto Eliminado',
                        icon: 'success',
                        showConfirmButton: false,
                        timer:1500
                    })
                }
            })
        })
    })


    let buttonView = document.querySelectorAll('#tablaBoletos tr td.view a');
    buttonView.forEach(element => {
        element.addEventListener('click',(e)=>{
            e.preventDefault();
            let id = e.target.id
            archivoBoletos = JSON.parse(localStorage.getItem('boletos'));
            let boletoFinanciacion = archivoBoletos.filter(elemento => elemento.numeroBoleto == id );
            representaArreglo(boletoFinanciacion);

            document.getElementById('Tabla2').innerHTML= `
                <thead>
                    <tr>
                        <th>Nº Cuota</th>
                        <th>Valor Cuota</th>
                    </tr>
                </thead>
                <tbody id="tablaFinanciación">
                    <!--Contenido de la tabla-->
                </tbody>`
                for( let i=1; i<=boletoFinanciacion[0].numeroCuotas; i++){
                    let numeroCuota = i
                    let valorCuota = (boletoFinanciacion[0].montoFinanciar / boletoFinanciacion[0].numeroCuotas)* (1+interes) ** (i-1);
                    document.getElementById('tablaFinanciación').insertRow(-1).innerHTML= `
                        <tr>
                            <th>${numeroCuota}</th>
                            <th>${valorCuota.toFixed(2)}</th>
                        </tr>
                        `
                }
        })
    }) 
};


// Función que busca un registro según el contenido del cuadro de búsqueda. Muestra el arreglo resultante (indirectamente).

const buscar = () => {
    let objetivo =  document.getElementById('buscarBoleto').value
    objetivo = objetivo.toUpperCase();
    archivoBoletos = JSON.parse(localStorage.getItem('boletos'));
    representaArreglo(archivoBoletos.filter(elemento => elemento.unidad == objetivo || elemento.numeroBoleto == objetivo || elemento.cliente.toUpperCase().includes(objetivo) || elemento.unidad.torre.toUpperCase().includes(objetivo) || elemento.unidad.piso.toUpperCase().includes(objetivo) || elemento.unidad.unidad.toUpperCase().includes(objetivo) ));
}
