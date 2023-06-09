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
    Frontend.obtenerNombres();

}

Frontend.mostrarTodosJugadoresOrdenados = function(){
  Frontend.obtenerNombresOrdenados();

}

Frontend.listarSoloNombresFr = async function () {
    try {
      const responseEsg = await fetch(Frontend.API_GATEWAY + "/Esgrima/getTodos");
      const responseNat = await fetch(Frontend.API_GATEWAY + "/Natacion/getTodos");
      const responseCic = await fetch(Frontend.API_GATEWAY + "/Ciclismo/sacaCiclistas");
      const responseEsc = await fetch(Frontend.API_GATEWAY + "/Escalada/getTodas");
      const responseTen = await fetch(Frontend.API_GATEWAY + "/TenisDMesa/getTodas");
      const dataEsg = await responseEsg.json();
      const dataNat = await responseNat.json();
      const dataCic = await responseCic.json();
      const dataEsc = await responseEsc.json();
      const dataTen = await responseTen.json();
      const nombres = [];
      dataEsg.data.forEach((persona) => {
        nombres.push(persona.data.nombre);
      });
      dataNat.data.forEach((persona) => {
        nombres.push(persona.data.Nombre_completo.Nombre);
      });
      dataCic.data.forEach((persona) => {
        nombres.push(persona.data.nombre);
      });
      dataEsc.data.forEach((persona) => {
        nombres.push(persona.data.nombre);
      });
      dataTen.data.forEach((persona) => {
        nombres.push(persona.data.nombre);
      });
      return nombres;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };



Frontend.obtenerNombres = async function () {
        const nombres = await Frontend.listarSoloNombresFr();
        const tabla = crearTabla(nombres);
      
}

Frontend.obtenerNombresOrdenados = async function () {
  const nombres = await Frontend.listarSoloNombresFr();
  nombres.sort();
  const tabla = crearTabla(nombres);

}
  
  function crearTabla(vector) {
    let tabla = ""
    tabla += Esgrima.EsgrimaTablaPersonas.cabeceraNombre;
    for (let i = 0; i < vector.length; i++) {
      let nombre = vector[i];
        tabla += '<td>' + nombre + '</td>';
      
      tabla += '</tr><tr>';
    }
    tabla += '</tr></tbody></table>';
    Frontend.Article.actualizar( "Listado de nombres", tabla )
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



Frontend.listarSoloDeportesFr = async function () {
  try {
    const responseEsg = await fetch(Frontend.API_GATEWAY + "/Esgrima/getTodos");
    const responseNat = await fetch(Frontend.API_GATEWAY + "/Natacion/getTodos");
    const responseCic = await fetch(Frontend.API_GATEWAY + "/Ciclismo/sacaCiclistas");
    const responseEsc = await fetch(Frontend.API_GATEWAY + "/Escalada/getTodas");
    const responseTen = await fetch(Frontend.API_GATEWAY + "/TenisDMesa/getTodas");
    const dataEsg = await responseEsg.json();
    const dataNat = await responseNat.json();
    const dataCic = await responseCic.json();
    const dataEsc = await responseEsc.json();
    const dataTen = await responseTen.json();
    const nombres = [];
    const deportes = [];
    dataEsg.data.forEach((persona) => {
      nombres.push(persona.data.nombre);
      deportes.push("Esgrima");
    });
    dataNat.data.forEach((persona) => {
      nombres.push(persona.data.Nombre_completo.Nombre);
      deportes.push("Natacion");
    });
    dataCic.data.forEach((persona) => {
      nombres.push(persona.data.nombre);
      deportes.push("Ciclismo");
    });
    dataEsc.data.forEach((persona) => {
      nombres.push(persona.data.nombre);
      deportes.push("Escalada");
    });
    dataTen.data.forEach((persona) => {
      nombres.push(persona.data.nombre);
      deportes.push("Tenis de mesa");
    });
    return deportes;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

function crearTablaDep(vectorN, vectorD) {
  let tabla = `<table width="100%" class="listado-personas">
  <thead>
      <th width="100%">Nombre</th> 
      <th width="100%">Deporte</th> 
  </thead>
  <tbody>
`;
   
  for (let i = 0; i < vectorN.length; i++) {
    let nombre = vectorN[i];
    let deporte = vectorD[i];
      tabla += '<td>' + nombre + '</td>';
      tabla += '<td>' + deporte + '</td>' ;
    
    tabla += '</tr><tr>';
  }
  tabla += '</tr></tbody></table>';
  Frontend.Article.actualizar( "Listado de nombres", tabla )
}

Frontend.buscarNombresCadena = async function (texto) {
  const nombres = await Frontend.listarSoloNombresFr();
  const deportes = await Frontend.listarSoloDeportesFr();
  let vectorN = [];
  let vectorD = [];
  
  for(var i=0; i<nombres.length; i++){
    if(nombres[i].toLowerCase().includes(texto.toLowerCase())){
      vectorN.push(nombres[i]);
      vectorD.push(deportes[i]);
    }
  }
  
  const tabla = crearTablaDep(vectorN, vectorD);
}









