/**
 * @file TenisDMesa.js
 * @description Funciones para el procesamiento de la info enviada por el MS TenisDMesa
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let TenisDMesa = {};



// TenisDMesa de datosDescargados vacíos
TenisDMesa.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

// Tags que voy a usar para sustituir los campos
TenisDMesa.TenisDMesaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "FECHA": "### FECHA ###",
    "DIA": "### DIA ###",
    "MES": "### MES ###",
    "ANIO": "### ANIO ###",
    "DIRECION": "### DIRECCION ###",
    "CALLE": "### CALLE ###",
    "LOCALIDAD": "### LOCALIDAD ###",
    "PROVINCIA": "### PROVINCIA ###",
    "PAIS": "### PAIS ###",
    "PARTICIPACION MUNDIAL": "### PARTICIPACION MUNDIAL ###",
    "NUMERO_PARTICIPACIONES_JJOO": "### NUMERO_PARTICIPACIONES_JJOO ###",
    "LATERALIDAD": "### LATERALIDAD ###"
}

TenisDMesa.sustituyeTags = function (TenisDMesa, persona) {
    return TenisDMesa
        .replace(new RegExp(TenisDMesa.TenisDMesaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(TenisDMesa.TenisDMesaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(TenisDMesa.TenisDMesaTags.FECHA, 'g'), persona.data.fecha)
        .replace(new RegExp(TenisDMesa.TenisDMesaTags.DIA, 'g'), persona.data.fecha.dia)
        .replace(new RegExp(TenisDMesa.TenisDMesaTags.MES, 'g'), persona.data.fecha.mes)
        .replace(new RegExp(TenisDMesa.TenisDMesaTags.ANIO, 'g'), persona.data.fecha.anio)
        .replace(new RegExp(TenisDMesa.TenisDMesaTags.DIRECCION, 'g'), persona.data.direccion)
        .replace(new RegExp(TenisDMesa.TenisDMesaTags.CALLE, 'g'), persona.data.direccion.calle)
        .replace(new RegExp(TenisDMesa.TenisDMesaTags.LOCALIDAD, 'g'), persona.data.direccion.localidad)
        .replace(new RegExp(TenisDMesa.TenisDMesaTags.PROVINCIA, 'g'), persona.data.direccion.provincia)
        .replace(new RegExp(TenisDMesa.TenisDMesaTags.PAIS, 'g'), persona.data.direccion.pais)
        .replace(new RegExp(TenisDMesa.TenisDMesaTags["PARTICIPACION MUNDIAL"], 'g'), persona.data.participacion_mundial)
        .replace(new RegExp(TenisDMesa.TenisDMesaTags.NUMERO_PARTICIPACIONES_JJOO, 'g'), persona.data.numero_participaciones_jo)
        .replace(new RegExp(TenisDMesa.TenisDMesaTags.LATERALIDAD, 'g'), persona.data.lateralidad)
}

TenisDMesa.actualiza = function (persona) {
    return TenisDMesa.sustituyeTags(this.cuerpo, persona)
}

//FUNCIONES PARA CREAR TABLA CON TODOS LOS DATOS DE LOS JUGADORES

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
TenisDMesa.cabecera = function () {
    return `<table class="listado-TenisDMesa"><thead><th>Nombre</th><th>Fecha</th><th>Direccion</th><th>Años participacion mundial</th><th>Numero de participaciones</th><th>Lateralidad</th></thead><tbody>`;
}


/**
 * Muestra la información de cada jugador en un elemento TR con sus correspondientes TD
 * @param {jugador} p Datos del jugador a mostrar
 * @returns Cadena conteniendo toda la informacion referente a un jugador.
 */
TenisDMesa.cuerpo = function (p) {
    const d = p.data
    const fecha = d.fecha;
    const direccion = d.direccion;

    return `<tr title="${p.ref['@ref'].id}">
    <td>${d.nombre}</td>
    <td>${fecha.dia}/${fecha.mes}/${fecha.anio}</td>
    <td>${direccion.calle},${direccion.localidad},${direccion.provincia},${direccion.pais}</td>
    <td>${d.participacion_mundial}</td>
    <td>${d.numero_participaciones_jo}</td>
    <td>${d.lateralidad}</td>
    </tr>
    `;
}


/**
 * Pie de la tabla en la que se muestran las personas
 * @returns Cadena con el pie de la tabla
 */
TenisDMesa.pie = function () {
    return "</tbody></table>";
}




//FUNCIONES PARA CREAR TABLA DE NOMBRES

/**
 * Crea la cabecera de la tabla nombres para mostrar la info como tabla
 * @returns Cabecera de la tabla nombres
 */
TenisDMesa.cabecera_nombres = function () {
    return `<table class="listado-TenisDMesa"><thead><th>Nombre</th></thead><tbody>`;
}


/**
 * Muestra la información de cada jugador en un elemento TR con sus correspondientes TD
 * @param {jugador} p Datos del jugador a mostrar
 * @returns Cadena conteniendo el nombre del jugador.
 */
TenisDMesa.cuerpo_nombres = function (p) {
    const d = p.data

    return `<tr title="${p.ref['@ref'].id}"><td>${d.nombre}</td></tr>`;
}



//FUNCIONES PARA DESCARGAR RUTAS

/**
 * Función que descarga la info MS TenisDMesa al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
TenisDMesa.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio TenisDMesa
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}




//FUNCIONES PARA RECUPERAR DATOS

/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

TenisDMesa.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/TenisDMesa/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
    }
}

/**
 * Función que recuperar los datos y muestra los nombres de los jugadores en orden alfabetico
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */ 
TenisDMesa.ordenaAlfabeticamente = async function (callBackFn) {
    let response = null

    try {
        const url = Frontend.API_GATEWAY + "/TenisDMesa/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los TenisDMesa que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        vectorPersonas.data.sort((a,b) => {
            const nombreA = a.data.nombre.toLowerCase();
            const nombreB = b.data.nombre.toLowerCase();

            if(nombreA < nombreB) { 
                return -1; 
            }
            if(nombreA > nombreB) { 
                return 1; 
            }
            return 0;
        });

        callBackFn(vectorPersonas.data)
    }
}

/**
 * Función que recuperar los datos y los muestra ordenados por un campo indicado
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */ 
TenisDMesa.ordenaPorCampo = async function (campo, callBackFn) {
    let response = null

    // Intento conectar con el microservicio TenisDMesa
    try {
        const url = Frontend.API_GATEWAY + "/TenisDMesa/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los TenisDMesa que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        vectorPersonas.data.sort((a,b) => {
            const campoA = a.data[campo].toLowerCase();
            const campoB = b.data[campo].toLowerCase();

            if(campoA < campoB) { 
                return -1; 
            }
            if(campoA > campoB) { 
                return 1; 
            }
            return 0;
        });

        callBackFn(vectorPersonas.data)
    }
}


TenisDMesa.ordenaPorCampoCompuesto = async function (campo,campo1, callBackFn) {
    let response = null

    // Intento conectar con el microservicio TenisDMesa
    try {
        const url = Frontend.API_GATEWAY + "/TenisDMesa/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los TenisDMesa que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        vectorPersonas.data.sort((a,b) => {
            const campoA = a.data[campo][campo1].toLowerCase();
            const campoB = b.data[campo][campo1].toLowerCase();

            if(campoA < campoB) { 
                return -1; 
            }
            if(campoA > campoB) { 
                return 1; 
            }
            return 0;
        });

        callBackFn(vectorPersonas.data)
    }
}

TenisDMesa.ordenaPorCampoNumerico = async function (campo, callBackFn) {
    let response = null

    // Intento conectar con el microservicio TenisDMesa
    try {
        const url = Frontend.API_GATEWAY + "/TenisDMesa/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los TenisDMesa que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        vectorPersonas.data.sort((a,b) => {
            const campoA = parseFloat(a.data[campo]);
            const campoB = parseFloat(b.data[campo]);

            if(campoA < campoB) { 
                return -1; 
            }
            if(campoA > campoB) { 
                return 1; 
            }
            return 0;
        });

        callBackFn(vectorPersonas.data)
    }
}


TenisDMesa.recuperaUnJugador = async function (idJugador, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/TenisDMesa/getPorId/" + idJugador
        const response = await fetch(url);
        if (response) {
            const jugador = await response.json()
            callBackFn(jugador)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}


TenisDMesa.buscarPorNombre = async function (callBackFn, nombre) {
    let response = null
    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/TenisDMesa/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Filtro el vector de personas para obtener solo la que tiene el nombre pasado como parámetro
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json() 
        const filtro = vectorPersonas.data.filter(jugador => jugador.data.nombre === nombre);      
        callBackFn(filtro)
    }
}

TenisDMesa.buscarPorVarios = async function (callBackFn, nombre, localidad, participaciones, lateralidad) {
    let response = null
    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/TenisDMesa/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Filtro el vector de personas para obtener solo la que tiene el nombre pasado como parámetro
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json() 
        const filtro = vectorPersonas.data.filter(jugador => jugador.data.nombre === nombre && 
            jugador.data.direccion.localidad === localidad && jugador.data.numero_participaciones_jo.toString() === participaciones 
            && jugador.data.lateralidad == lateralidad);      
        callBackFn(filtro)
    }
}

TenisDMesa.buscarPorVarios2 = async function (callBackFn, nombre, localidad, participaciones, lateralidad) {
    let response = null
    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/TenisDMesa/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Filtro el vector de personas para obtener solo la que tiene el nombre pasado como parámetro
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json() 
        const filtro = vectorPersonas.data.filter(jugador => jugador.data.nombre === nombre || 
            jugador.data.direccion.localidad === localidad || jugador.data.numero_participaciones_jo.toString() === participaciones 
            || jugador.data.lateralidad == lateralidad);      
        callBackFn(filtro)
    }
}




//FUNCIONES PARA MOSTRAR

/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS TenisDMesa
 */
TenisDMesa.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("TenisDMesa Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS TenisDMesa
 */
TenisDMesa.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("TenisDMesa Acerca de", mensajeAMostrar)
}


TenisDMesa.listadoTodos = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += TenisDMesa.cabecera();
    vector.forEach(e => msj += TenisDMesa.cuerpo(e))
    msj += TenisDMesa.pie();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de jugadores", msj )

}


TenisDMesa.listadoNombres = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += TenisDMesa.cabecera_nombres();
    vector.forEach(e => msj += TenisDMesa.cuerpo_nombres(e))
    msj += TenisDMesa.pie();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de jugadores por nombre", msj )

}


TenisDMesa.listarUnJugador = function (jugador) {
    let msj = "";
    msj += TenisDMesa.cabecera();
    msj += TenisDMesa.cuerpo(jugador)
    msj += TenisDMesa.pie();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Jugador mostrado", msj )

}



//FUNCIONES PARA RESPONDER A EVENTOS

/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
TenisDMesa.procesarHome = function () {
    this.descargarRuta("/TenisDMesa/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
TenisDMesa.procesarAcercaDe = function () {
    this.descargarRuta("/TenisDMesa/acercade", this.mostrarAcercaDe);
}

/**
 * Función principal para responder al evento de elegir la opción "Listado jugadores"
 */
TenisDMesa.muestraTodos = function () {
    //this.descargarRuta("/TenisDMesa/getTodos", this.listadoTodos());
    this.recupera(this.listadoTodos);
}

/**
 * Función principal para responder al evento de elegir la opción "Listado jugadores por nombre"
 */
TenisDMesa.muestraNombres = function () {
    //this.descargarRuta("/TenisDMesa/getTodos", this.listadoTodos());
    this.recupera(this.listadoNombres);
}

/**
 * Función principal para responder al evento de elegir la opción "Listado nombres alfabeticamente"
 */
TenisDMesa.muestraNombresAlfabeticamente = function () {
    this.ordenaAlfabeticamente(this.listadoNombres);
}

/**
 * Función principal para responder al evento de elegir la opción "Nombre, lateralidad"
 */
TenisDMesa.muestraDatosCampo = function (variable) {
    TenisDMesa.ordenaPorCampo(variable,TenisDMesa.listadoTodos);
}

/**
 * Función principal para responder al evento de elegir la opción "Direccion"
 */
TenisDMesa.muestraDatosCampoCompuesto = function (variable,variable1) {
    TenisDMesa.ordenaPorCampoCompuesto(variable,variable1,TenisDMesa.listadoTodos);
}

/**
 * Función principal para responder al evento de elegir la opción "Participaciones juegos olimpicos"
 */
TenisDMesa.muestraDatosCampoNumerico = function (variable) {
    TenisDMesa.ordenaPorCampoNumerico(variable,TenisDMesa.listadoTodos);
}


TenisDMesa.muestraUnJugador = function (idJugador) {
    this.recuperaUnJugador(idJugador, this.listarUnJugador);
}


TenisDMesa.muestraDatosDadoNombre = function (buscar) {
    this.buscarPorNombre(this.listadoTodos, buscar);
}

TenisDMesa.muestraDatosDadoVarios = function (dato1,dato2,dato3,dato4) {
    this.buscarPorVarios(this.listadoTodos,dato1,dato2,dato3,dato4);
}

TenisDMesa.muestraDatosDadoVarios2 = function (dato1,dato2,dato3,dato4) {
    this.buscarPorVarios2(this.listadoTodos,dato1,dato2,dato3,dato4);
}















