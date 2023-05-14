/**
 * @file front-end.js
 * @description Funciones comunes para todos los módulos de front-end. Debe cargarse la primera de todas.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 06-feb-2023
 */

/// Espacio de nombres
let Frontend = {};

/// Concatenación de mensajes para Acerca De
Frontend.AcercaDeMsj= ""


/// Dirección del MS que funciona como API_GATEWAY
Frontend.API_GATEWAY = "http://localhost:8001"

/// Algunas constantes relacionadas con CSS y HTML
Frontend.ID_SECCION_PRINCIPAL = "seccion-principal"
Frontend.ID_SECCION_PRINCIPAL_TITULO = "seccion-principal-titulo"
Frontend.ID_SECCION_PRINCIPAL_CONTENIDO = "seccion-principal-contenido"


/// Objeto Article dentro Frontend para tratar con el contenido del elemento Article del DOM
Frontend.Article = {}


/**
 * Cambia toda la información del article
 * @param {String} titulo Información para el título del article 
 * @param {String} contenido INformacion para el contenido del article
 * @returns El propio Article para concatenar llamadas
 */
Frontend.Article.actualizar = function (titulo, contenido) {
    // Si son nulos, los sustituyo por la cadena vacía
    titulo = titulo || ""
    contenido = contenido || ""
    // Sustituyo el título y el contenido del articulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_TITULO ).innerHTML = titulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_CONTENIDO ).innerHTML = contenido
    return this;
}


/**
 * Llama a las rutas de cada deporte para descragar los datos de Acerca De
 */
Frontend.mostrarTodoAcercaDe = function() {
    Frontend.AcercaDeMsj=""
    Natacion.descargarRuta("/Natacion/acercade", this.mostrarAcercaDe)
    Esgrima.descargarRuta("/Esgrima/acercade", this.mostrarAcercaDe)
    Ciclismo.descargarRuta("/Ciclismo/acercaDe", this.mostrarAcercaDe)
    Escalada.descargarRuta("/Escalada/acercaDe", this.mostrarAcercaDe)
    TenisDMesa.descargarRuta("/TenisDMesa/acercade", this.mostrarAcercaDe)
  }

Frontend.mostrarTodosJugadores = function(){
    Esgrima.listarSoloNombres();
    Natacion.listarNombres();
}


  
  /**
   * Muestra los datos de Acerca De de todos los miembros
   * @param {*} datosDescargados  datos de cada uno
   */
Frontend.mostrarAcercaDe = function(datosDescargados){
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

   Frontend.AcercaDeMsj += mensajeAMostrar;
   Frontend.Article.actualizar("Acerca De", Frontend.AcercaDeMsj);
}
