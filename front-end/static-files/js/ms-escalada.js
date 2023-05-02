
/**
 * @file Escalada.js
 * @description Funciones para el procesamiento de la info enviada por el MS Escalada
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Escalada = {};

// Escalada de dDescargados vacíos
Escalada.dDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Escalada al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los d.
 */
Escalada.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Escalada
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let dDescargados = null
    if (response) {
        dDescargados = await response.json()
        callBackFn(dDescargados)
    }
}


/**
 * Función principal para mostrar los d enviados por la ruta "home" de MS Escalada
 */
Escalada.mostrarHome = function (dDescargados) {
    // Si no se ha proporcionado valor para dDescargados
    dDescargados = dDescargados || this.dDescargadosNulos

    // Si d descargados NO es un objeto 
    if (typeof dDescargados !== "object") dDescargados = this.dDescargadosNulos

    // Si d descargados NO contiene el campo mensaje
    if (typeof dDescargados.mensaje === "undefined") dDescargados = this.dDescargadosNulos

    Frontend.Article.actualizar("Escalada Home", dDescargados.mensaje)
}

/**
 * Función principal para mostrar los d enviados por la ruta "acerca de" de MS Escalada
 */
Escalada.mostrarAcercaDe = function (dDescargados) {
    // Si no se ha proporcionado valor para dDescargados
    dDescargados = dDescargados || this.dDescargadosNulos

    // Si d descargados NO es un objeto 
    if (typeof dDescargados !== "object") dDescargados = this.dDescargadosNulos

    // Si d descargados NO contiene los campos mensaje, autor, o email
    if (typeof dDescargados.mensaje === "undefined" ||
        typeof dDescargados.autor === "undefined" ||
        typeof dDescargados.email === "undefined" ||
        typeof dDescargados.fecha === "undefined"
    ) dDescargados = this.dDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${dDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${dDescargados.autor}</li>
        <li><b>E-mail</b>: ${dDescargados.email}</li>
        <li><b>Fecha</b>: ${dDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Escalada Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Escalada.procesarHome = function () {
    this.descargarRuta("/Escalada/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Escalada.procesarAcercaDe = function () {
    this.descargarRuta("/Escalada/acercade", this.mostrarAcercaDe);
}

/**
 * Función que recuperar todos los proyectos llamando al MS Proyectos
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los d.
 */
Escalada.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/Escalada/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
    }
}

Escalada.recuperaBuscar = async function (callBackFn, nombre) {
    let response = null
    //console.log(nombre);
    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/Escalada/getTodas"
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
       // console.log(vectorPersonas.data[0].data)     
        const filtro = vectorPersonas.data.filter(persona => persona.data.nombre === nombre)
        //console.log(filtro)        
        callBackFn(filtro)
    }
}

Escalada.recuperaBuscarTip = async function (callBackFn, nombre,tipo,num,calle) {
    let response = null
    //console.log(nombre);
    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/Escalada/getTodas"
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
       // console.log(vectorPersonas.data[0].data)     
        const filtro = vectorPersonas.data.filter(persona => persona.data.nombre === nombre || persona.data.tipo === tipo || persona.data.numeroParticipacionesOlimpicas === num || persona.data.direccion.calle === calle )
        //console.log(filtro)        
        callBackFn(filtro)
    }
}

Escalada.recuperaBuscarMas = async function (callBackFn, var1, var2, var3,var4) {
    let response = null
    //console.log(nombre);
    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/Escalada/getTodas"
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
       // console.log(vectorPersonas.data)     
        const filtro = vectorPersonas.data.filter(persona => persona.data.nombre === var1 && persona.data.direccion.localidad === var2 && persona.data.tipo === var3 && persona.data.aniosParticipacionMundial.filter(aniosParticipacionMundial => aniosParticipacionMundial === var4))
        console.log(filtro)        
        callBackFn(filtro)
    }
}

// Funciones para mostrar como TABLE

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Escalada.cabeceraTable = function () {
    return `<table class="listado-personas">
        <thead>
        <th>ID</th><th>Nombre</th><th>Apellidos</th><th>Dirección</th><th>Años participación</th><th>Número participaciones</th><th>Tipo</th> 
        </thead>
        <tbody>
    `;
}

Escalada.cabeceraTableNombres = function () {
    return `<table class="listado-personas"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th></thead><tbody>`;
}

/**
 * Muestra la información de cada persona en un elemento TR con sus correspondientes TD
 * @param {persona} p d del proyecto a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
 */
Escalada.cuerpoTr = function (p) {
    const d = p.data;
    const nombre = d.nombre;
    const apellidos = d.apellido;
    const direc = d.direccion;
    const añosParticipacion = d.aniosParticipacionMundial;
    const numCompeticiones = d.numeroParticipacionesOlimpicas;
    const tipo = d.tipo;

    return `<tr title="${p.ref['@ref'].id}">
    <td>${p.ref['@ref'].id}</td>
    <td>${nombre}</td>
    <td> ${apellidos}</td>
    <td>${direc.calle},${direc.localidad},${direc.provincia},${direc.pais}</td>
    <td>${añosParticipacion}</td>
    <td>${numCompeticiones}</td>
    <td>${tipo}</td>
    </tr>`;
}

Escalada.cuerpoTrNombres = function (p) {
    const d = p.data;
    const nombre = d.nombre;
    const apellidos = d.apellido;
  

    return `<tr title="${p.ref['@ref'].id}">
    <td>${p.ref['@ref'].id}</td>
    <td>${nombre}</td>
    <td> ${apellidos}</td>
    </tr>`;
}



/**
 * Pie de la tabla en la que se muestran las personas
 * @returns Cadena con el pie de la tabla
 */
Escalada.pieTable = function () {
    return "</tbody></table>";
}


/**
 * Función para mostrar en pantalla todos los proyectos que se han recuperado de la BBDD.
 * @param {Vector_de_proyectos} vector Vector con los d de los proyectos a mostrar
 */
Escalada.imprime = function (vector) {
    console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Escalada.cabeceraTable();
    vector.forEach(e => msj += Escalada.cuerpoTr(e))
    msj += Escalada.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de personas", msj )

}

Escalada.imprimeMostrar = function (persona) {
    let msj = "";
    msj += Escalada.cabeceraTable();
    msj += Escalada.cuerpoTr(persona)
    msj += Escalada.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Persona mostrada", msj )

}


Escalada.imprimeNombres = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Escalada.cabeceraTableNombres();
    vector.forEach(e => msj += Escalada.cuerpoTrNombres(e))
    msj += Escalada.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de nombre de personas", msj )

}


/**
 * Función que recuperar todos los Escalada llamando al MS Escalada
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */ 
Escalada.recuperaAlfabetic = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio Escalada
    try {
        const url = Frontend.API_GATEWAY + "/Escalada/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los Escalada que se han descargado
    let vectorEscalada = null
    if (response) {
        vectorEscalada = await response.json()
        vectorEscalada.data.sort((a,b) => {
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

        callBackFn(vectorEscalada.data)
    }
}

/**
 * Función principal para recuperar los proyectos desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */
Escalada.listar = function () {
    this.recupera(this.imprime);
}

Escalada.listarNombres = function () {
    this.recupera(this.imprimeNombres);
}

Escalada.listarBuscar = function (search) {
    this.recuperaBuscar(this.imprime,search);
}


Escalada.listarBuscarTip = function (search1,search2, search3, search4) {
    this.recuperaBuscarTip(this.imprime,search1,search2, search3, search4);
}

Escalada.listarBuscarMas = function (search1,search2, search3,search4) {
    this.recuperaBuscarMas(this.imprime,search1,search2,search3,search4);
}


Escalada.listarNombreAlfa = function () {
    this.recuperaAlfabetic(this.imprimeNombres);
}
/**
 * Función que recuperar todas las personas llamando al MS Personas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idPersona Identificador de la persona a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Escalada.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/Escalada/getPorId/" + idPersona
        const response = await fetch(url);
        if (response) {
            const persona = await response.json()
            callBackFn(persona)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}

Escalada.recuperaAlfabeticVarios = async function (campo, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Escalada
    try {
        const url = Frontend.API_GATEWAY + "/Escalada/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los Escalada que se han descargado
    let vectorEscalada = null
    if (response) {
        vectorEscalada = await response.json()
        vectorEscalada.data.sort((a,b) => {
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

        callBackFn(vectorEscalada.data)
    }
}

Escalada.recuperaAlfabeticVarios2 = async function (campo,campo1, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Escalada
    try {
        const url = Frontend.API_GATEWAY + "/Escalada/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los Escalada que se han descargado
    let vectorEscalada = null
    if (response) {
        vectorEscalada = await response.json()
        vectorEscalada.data.sort((a,b) => {
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

        callBackFn(vectorEscalada.data)
    }
}


Escalada.recuperaNumericamenteVarios = async function (campo, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Escalada
    try {
        const url = Frontend.API_GATEWAY + "/Escalada/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los Escalada que se han descargado
    let vectorEscalada = null
    if (response) {
        vectorEscalada = await response.json()
        vectorEscalada.data.sort((a,b) => {
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

        callBackFn(vectorEscalada.data)
    }
}

/**
 * Función principal para mostrar los datos de una persona desde el MS y, posteriormente, imprimirla.
 * @param {String} idPersona Identificador de la persona a mostrar
 */
Escalada.mostrar = function (idPersona) {
    this.recuperaUnaPersona(idPersona, this.imprimeMostrar);
}

Escalada.listarOrden = function (variable) {
    Escalada.recuperaAlfabeticVarios(variable,Escalada.imprime);
}

Escalada.listarOrden2 = function (variable) {
    Escalada.recuperaNumericamenteVarios(variable,Escalada.imprime);
}

Escalada.listarOrden3 = function (variable,variable1) {
    Escalada.recuperaAlfabeticVarios2(variable,variable1,Escalada.imprime);
}


