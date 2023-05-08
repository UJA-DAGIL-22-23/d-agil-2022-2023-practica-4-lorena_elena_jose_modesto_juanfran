/**
 * @file Esgrima.js
 * @description Funciones para el procesamiento de la info enviada por el MS Esgrima
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Esgrima = {};

// Esgrima de datosDescargados vacíos
Esgrima.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}
Esgrima.personaMostrada = null

/**
 * Función que descarga la info MS Esgrima al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Esgrima.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Esgrima
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


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Esgrima
 */
Esgrima.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Esgrima Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Esgrima
 */
Esgrima.mostrarAcercaDe = function (datosDescargados) {
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
    Frontend.Article.actualizar("Esgrima Acerca de", mensajeAMostrar)
}

/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Esgrima.procesarHome = function () {
    this.descargarRuta("/Esgrima/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Esgrima.procesarAcercaDe = function () {
    this.descargarRuta("/Esgrima/acercade", this.mostrarAcercaDe);
}



Esgrima.listar = function () {
    this.recupera(this.imprime);
}

Esgrima.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/Esgrima/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorProyectos = null
    if (response) {
        vectorProyectos = await response.json()
        callBackFn(vectorProyectos.data)
    }
}

Esgrima.imprime = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Esgrima.EsgrimaTablaPersonas.cabecera;
    vector.forEach(e => msj += Esgrima.EsgrimaTablaPersonas.actualiza(e))
    msj += Esgrima.EsgrimaTablaPersonas.pie;

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de nombres", msj )

}

Esgrima.EsgrimaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "FECHA_NACIMIENTO": "### FECHA_NACIMIENTO ###",
    "NACIONALIDAD": "### NACIONALIDAD ###",
    "PESO": "### PESO ###",
    "ALTURA": "### ALTURA ###",
    "PARTICIPACIONJJOO": "### PARTICIPACIONJJOO ###",
    "FEDERADO": "### FEDERADO ###",
    "PESO_ESPADA": "### PESO_ESPADA ###",
    "SEXO": "### SEXO ###",
    "VICTORIAS": "### VICTORIAS ###"
}

Esgrima.EsgrimaTablaPersonas = {}


// Cabecera de la tabla
Esgrima.EsgrimaTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <tr>
                        <th width="10%">ID</th>
                        <th width="10%">Nombre</th>
                        <th  width="10%">Fecha_nacimiento</th>
                        <th width="10%">Nacionalidad</th>
                        <th width="10%">Peso</th>
                        <th width="10%">Altura</th>
                        <th width="10%">ParticipacionJJOO</th>
                        <th width="10%">Federado</th>
                        <th width="10%">Peso_espada</th>
                        <th width="5%">Sexo</th>
                        <th width="5%">Victorias</th>
                        <th width="10%">Acciones</th>
                    </tr>
                    <tbody>
    `;

Esgrima.EsgrimaTablaPersonas.cabeceraNombre = `<table width="100%" class="listado-personas">
                <thead>
                    <th width="100%">Nombre</th> 
                </thead>
                <tbody>
`;
// Elemento TR que muestra los datos de una persona
Esgrima.EsgrimaTablaPersonas.cuerpo = `
    <tr title="${Esgrima.EsgrimaTags.ID}">
        <td>${Esgrima.EsgrimaTags.ID}</td>
        <td>${Esgrima.EsgrimaTags.NOMBRE}</td>
        <td>${Esgrima.EsgrimaTags.FECHA_NACIMIENTO}</td>
        <td>${Esgrima.EsgrimaTags.NACIONALIDAD}</td>
        <td>${Esgrima.EsgrimaTags.PESO}</td>
        <td>${Esgrima.EsgrimaTags.ALTURA}</td>
        <td>${Esgrima.EsgrimaTags["PARTICIPACIONJJOO"]}</td>
        <td>${Esgrima.EsgrimaTags.FEDERADO}</td>
        <td>${Esgrima.EsgrimaTags.PESO_ESPADA}</td>
        <td>${Esgrima.EsgrimaTags.SEXO}</td>
        <td>${Esgrima.EsgrimaTags.VICTORIAS}</td>
        <td>
                    <div><a href="javascript:Esgrima.mostrar('${Esgrima.EsgrimaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
        
    </tr>
    `;
Esgrima.EsgrimaTablaPersonas.cuerpoSoloNombre = `
<tr title="${Esgrima.EsgrimaTags.ID}">
    <td>${Esgrima.EsgrimaTags.NOMBRE}</td>
</tr>
`;

// Pie de la tabla
Esgrima.EsgrimaTablaPersonas.pie = `</tbody></table>`;

/**
 * Actualiza el cuerpo de la Esgrima deseada con los datos de la persona que se le pasa
 * @param {String} Esgrima Cadena conteniendo HTML en la que se desea cambiar lso campos de la Esgrima por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La Esgrima del cuerpo de la tabla con los datos actualizados 
 */          

// Victor, 8-may-2023: El parámetro esgrima debe ir en minúsculas, si no, "reemplaza" al objeto global Esgrima dentro de la función 
Esgrima.sustituyeTags = function (esgrima, persona) {
    let fechaNacimiento=`${persona.data.fecha_nacimiento.dia}/
    ${persona.data.fecha_nacimiento.mes}/${persona.data.fecha_nacimiento.año}`

    return esgrima
        .replace(new RegExp(Esgrima.EsgrimaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Esgrima.EsgrimaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Esgrima.EsgrimaTags.FECHA_NACIMIENTO, 'g'), fechaNacimiento)
        .replace(new RegExp(Esgrima.EsgrimaTags.NACIONALIDAD, 'g'), persona.data.nacionalidad)
        .replace(new RegExp(Esgrima.EsgrimaTags.PESO, 'g'), persona.data.peso)
        .replace(new RegExp(Esgrima.EsgrimaTags.ALTURA, 'g'), persona.data.altura)
        .replace(new RegExp(Esgrima.EsgrimaTags.PARTICIPACIONJJOO, 'g'), Esgrima.convertirParticipacion(persona.data.participacionJJOO))
        .replace(new RegExp(Esgrima.EsgrimaTags.FEDERADO, 'g'), persona.data.federado===true?"SI":"NO")
        .replace(new RegExp(Esgrima.EsgrimaTags.PESO_ESPADA, 'g'), persona.data.peso_espada)
        .replace(new RegExp(Esgrima.EsgrimaTags.SEXO, 'g'), persona.data.sexo)
        .replace(new RegExp(Esgrima.EsgrimaTags.VICTORIAS, 'g'), persona.data.victorias)

}

Esgrima.convertirParticipacion=function(arr){
    let participacion=""
    arr.forEach(pr=>participacion+=pr+" ")
    return participacion
}
/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La Esgrima del cuerpo de la tabla con los datos actualizados 
 */
Esgrima.EsgrimaTablaPersonas.actualiza = function (persona) {
    return Esgrima.sustituyeTags(this.cuerpo, persona)
}

Esgrima.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/Esgrima/getPorId/" + idPersona
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

Esgrima.listarSoloNombres = function () {
    this.recupera(this.imprimeSoloNombres);
}

Esgrima.listarSoloNombresOrdenados = function () {
    this.recupera(this.imprimeSoloNombresOrdenados);
}

Esgrima.imprimeSoloNombres = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Esgrima.EsgrimaTablaPersonas.cabeceraNombre;
    vector.forEach(e => msj += Esgrima.EsgrimaTablaPersonas.actualizaSoloNombres(e))
    msj += Esgrima.EsgrimaTablaPersonas.pie;

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de nombres", msj )
}

Esgrima.imprimeSoloNombresOrdenados = function (vector) {
    // Para comprobar lo que hay en vector
    let msj = "";
    vector.sort((x, y) => x.data.nombre.localeCompare(y.data.nombre));
    msj += Esgrima.EsgrimaTablaPersonas.cabeceraNombre;
    vector.forEach(e => msj += Esgrima.EsgrimaTablaPersonas.actualizaSoloNombres(e))
    msj += Esgrima.EsgrimaTablaPersonas.pie;

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de nombres", msj )
    
}

Esgrima.EsgrimaTablaPersonas.actualizaSoloNombres = function (persona) {
    return Esgrima.sustituyeNombres(this.cuerpoSoloNombre, persona)
}
// Victor, 8-may-2023: El parámetro esgrima debe ir en minúsculas, si no, "reemplaza" al objeto global Esgrima dentro de la función
Esgrima.sustituyeNombres = function (esgrima, persona) {
    return esgrima
    .replace(new RegExp(Esgrima.EsgrimaTags.NOMBRE, 'g'), persona.data.nombre)
}

Esgrima.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/Esgrima/getPorId/" + idPersona
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

Esgrima.personaComoTabla = function (persona) {
    return Esgrima.EsgrimaTablaPersonas.cabecera
        + Esgrima.EsgrimaTablaPersonas.actualiza(persona)
        + Esgrima.EsgrimaTablaPersonas.pie;
}

Esgrima.imprimeUnaPersona = function (persona) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Esgrima.personaComoTabla(persona);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Esgrima.almacenaDatos(persona)
}

Esgrima.almacenaDatos = function (persona) {
    Esgrima.personaMostrada = persona;
}

Esgrima.mostrar = function (idPersona) {
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}



Esgrima.recuperaBuscar = async function (callBackFn, nombre,tipo) {
    let response = null
    //console.log(nombre);
    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/Esgrima/getTodos"
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
        var filtro
        if(tipo=="nacionalidad"){
            filtro = vectorPersonas.data.filter(persona => persona.data.nacionalidad === nombre)
        }else{
            if(tipo=="nombre"){
                filtro = vectorPersonas.data.filter(persona => persona.data.nombre === nombre)
            }else{
                if(tipo=="altura"){
                    filtro = vectorPersonas.data.filter(persona => persona.data.altura > nombre)
                }else{
                    filtro = vectorPersonas.data.filter(persona => persona.data.victorias > nombre)
                }
                
            }
        }
            
        
        //console.log(filtro)        
        callBackFn(filtro)
    }
}

Esgrima.recuperaBuscaSimultaneo = async function (callBackFn, pesoEspada,sex,part,check) {
    let response = null
    //console.log(nombre);
    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/Esgrima/getTodos"
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
        var filtro
        if(check.checked){
            filtro = vectorPersonas.data.filter(persona => persona.data.peso_espada >pesoEspada && persona.data.sexo === sex
                && persona.data.participacionJJOO.length > part)
        }else{
            filtro = vectorPersonas.data.filter(persona => persona.data.peso_espada >pesoEspada || persona.data.sexo === sex
                || persona.data.participacionJJOO.length > part)
        }
        
        
        //console.log(filtro)        
        callBackFn(filtro)
    }
}

Esgrima.listarBuscar = function (search,tipo) {
    this.recuperaBuscar(this.imprime,search,tipo);
}

Esgrima.listarBusquedaSimultanea = function (t1,t2,t3,check) {
    this.recuperaBuscaSimultaneo(this.imprime,t1,t2,t3,check);
}