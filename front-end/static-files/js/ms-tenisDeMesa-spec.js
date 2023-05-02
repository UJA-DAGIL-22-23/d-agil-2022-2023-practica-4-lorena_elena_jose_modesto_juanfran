/**
 * @file ms-TenisDMesa-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS TenisDMesa en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "TenisDMesa Home"
const TITULO_ACERCA_DE = "TenisDMesa Acerca de"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("TenisDMesa.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            TenisDMesa.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(TenisDMesa.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            TenisDMesa.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(TenisDMesa.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            TenisDMesa.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(TenisDMesa.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            TenisDMesa.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(TenisDMesa.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            TenisDMesa.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("TenisDMesa.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            TenisDMesa.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(TenisDMesa.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            TenisDMesa.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(TenisDMesa.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            TenisDMesa.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(TenisDMesa.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            TenisDMesa.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(TenisDMesa.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            TenisDMesa.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(TenisDMesa.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            TenisDMesa.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(TenisDMesa.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            TenisDMesa.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(TenisDMesa.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            TenisDMesa.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - TenisDMesa.descargarRuta
 - TenisDMesa.procesarAcercaDe
 - TenisDMesa.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */

//Prueba funcion pie de tabla
describe("TenisDMesa.Pie ", function () {
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(TenisDMesa.pie()).toBe("</tbody></table>");
        });
    it("debería devolver las etiquetas HTML para el pie de tabla al pasarle un valor vacío", function() {
            expect(TenisDMesa.pie()).not.toBe("");
        });
  
});


//Prueba funcion cabecera_nombres
describe("TenisDMesa.Cabecera_nombres ", function () {
    it("debería devolver las etiquetas HTML para la cabecera_nombres de tabla",
        function () {
            expect(TenisDMesa.cabecera_nombres()).toBe(`<table class="listado-TenisDMesa"><thead><th>Nombre</th></thead><tbody>` );
        });
    it("debería devolver las etiquetas HTML para la cabecera de tabla nombres al pasarle un valor vacío", function() {
            expect(TenisDMesa.cabecera_nombres()).not.toBe("");
        });
    
});


//Prueba funcion cuerpo_nombres
describe("TenisDMesa.Cuerpo_nombres ", function () {

    // Preparo los datos
    let p = {
        ref: { "@ref": { id: "ref persona 1" } },
        data: {
            nombre: "Lorena"
        }
    }

    // Realizo los expect
    it("debería devolver las etiquetas HTML para el cuerpo_nombres de tabla",
        function () {
            expect(TenisDMesa.cuerpo_nombres(p)).toBe(`<tr title="${p.ref['@ref'].id}"><td>${p.data.nombre}</td></tr>`);
        });
    it("debería devolver las etiquetas HTML para el cuerpo de la tabla nombres al pasarle un valor vacío", function() {
            expect(TenisDMesa.cuerpo_nombres(p)).not.toBe("");
        });
  
});



//Prueba funcion cabecera
describe("TenisDMesa.Cabecera ", function () {
    it("debería devolver las etiquetas HTML para la cabecera de tabla",
        function () {
            expect(TenisDMesa.cabecera()).toBe(`<table class="listado-TenisDMesa"><thead><th>Nombre</th><th>Fecha</th><th>Direccion</th><th>Años participacion mundial</th><th>Numero de participaciones</th><th>Lateralidad</th></thead><tbody>` );
        });
    it("debería devolver las etiquetas HTML para la cabecera de tabla al pasarle un valor vacío", function() {
            expect(TenisDMesa.cabecera()).not.toBe("");
        });
});



//Prueba funcion cuerpo
describe("TenisDMesa.Cuerpo ", function () {

    // Preparo los datos
    let p = {
        ref: { "@ref": { id: "ref persona 1" } },
        data: {
            nombre: "Lorena"
            , fecha: { dia: 23, mes: 12, anio: 2000 }
            , direccion: { calle: "Yabal", localidad: "Jamilena", provincia: "Jaen", pais: "España" }
            , participacion_mundial: [2014, 2018, 2022]
            , numero_participaciones_jo: 3
            , lateralidad: "diestro" 
        }
    }

    // Realizo los expect
    it("debería devolver las etiquetas HTML para el cuerpo de tabla",
        function () {
            let msj = TenisDMesa.cuerpo(p)
            expect(msj.includes(p.data.nombre)).toBeTrue();
            expect(msj.includes(p.data.fecha.dia)).toBeTrue();
            expect(msj.includes(p.data.fecha.mes)).toBeTrue();
            expect(msj.includes(p.data.fecha.anio)).toBeTrue();
            expect(msj.includes(p.data.direccion.calle)).toBeTrue();
            expect(msj.includes(p.data.direccion.localidad)).toBeTrue();
            expect(msj.includes(p.data.direccion.provincia)).toBeTrue();
            expect(msj.includes(p.data.direccion.pais)).toBeTrue();
            expect(msj.includes(p.data.participacion_mundial)).toBeTrue();
            expect(msj.includes(p.data.numero_participaciones_jo)).toBeTrue();
            expect(msj.includes(p.data.lateralidad)).toBeTrue();

        });
    it("debería devolver las etiquetas HTML para el cuerpo de la tabla al pasarle un valor vacío", function() {
            expect(TenisDMesa.cuerpo(p)).not.toBe("");
        });
});


//Prueba funcion listadoNombres
describe("TenisDMesa.listadoNombres ", function () {
    // Realizo los expect
  it("debería imprimir por pantalla la tabla de los nombres de los jugadores",
      function () {
          const vector = [
              {
                  ref: { "@ref": { id: "ref persona 1" } },
                  data: { nombre: "Lorena" }
              },
              {
                  ref: { "@ref": { id: "ref persona 2" } },
                  data: { nombre:"Leire" }
              }
          ];
          
      const expectedMsj = TenisDMesa.cabecera_nombres() + TenisDMesa.cuerpo_nombres(vector[0]) + TenisDMesa.cuerpo_nombres(vector[1]) + TenisDMesa.pie();
      spyOn(Frontend.Article, 'actualizar');
      TenisDMesa.listadoNombres(vector);
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de jugadores por nombre', expectedMsj);
  });
  
});


//Prueba funcion listadoTodos
describe("TenisDMesa.listadoTodos ", function () {
    // Realizo los expect
  it("debería imprimir por pantalla la tabla de todos los datos de los jugadores",
      function () {
          const vector = [
              {
                  ref: { "@ref": { id: "ref persona 1" } },
                  data: { 
                    nombre: "Lorena", 
                    fecha: {
                        dia: 23,
                      mes: 12,
                      anio: 2000
                    },
                    direccion: {
                      calle: "Yabal",
                      localidad: "Jamilena",
                      provincia: "Jaen",
                      pais: "España"
                    },
                    participacion_mundial: [
                      2014,
                      2018,
                      2022
                    ],
                    numero_participaciones_jo: 3,
                    lateralidad: "diestro"
                  }
              },
              {
                ref: { "@ref": { id: "ref persona 2" } },
                data: { 
                  nombre: "Jaime", 
                  fecha: {
                      dia: 16,
                    mes: 04,
                    anio: 1990
                  },
                  direccion: {
                    calle: "Alamos",
                    localidad: "Jaen",
                    provincia: "Jaen",
                    pais: "España"
                  },
                  participacion_mundial: [
                    2010,
                    2014,
                    2018
                  ],
                  numero_participaciones_jo: 3,
                  lateralidad: "diestro"
                }
              }
          ];
          
      const expectedMsj = TenisDMesa.cabecera() + TenisDMesa.cuerpo(vector[0]) + TenisDMesa.cuerpo(vector[1]) + TenisDMesa.pie();
      spyOn(Frontend.Article, 'actualizar');
      TenisDMesa.listadoTodos(vector);
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de jugadores', expectedMsj);
  });
});


//Prueba listarUnJugador
describe("TenisDMesa.listarUnJugador", function () {
    it("debería imprimir por pantalla los datos de un jugador", function () {
      const jugador = {
        ref: { "@ref": { id: "ref persona 1" } },
        data: { 
          nombre: "Lorena", 
          fecha: {
            dia: 23,
            mes: 12,
            anio: 2000
          },
          direccion: {
            calle: "Yabal",
            localidad: "Jamilena",
            provincia: "Jaen",
            pais: "España"
          },
          participacion_mundial: [
            2014,
            2018,
            2022
          ],
          numero_participaciones_jo: 3,
          lateralidad: "diestro"
        }
      };
      const expectedMsj = TenisDMesa.cabecera() + TenisDMesa.cuerpo(jugador) + TenisDMesa.pie();
      spyOn(Frontend.Article, 'actualizar');
      TenisDMesa.listarUnJugador(jugador);
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Jugador mostrado', expectedMsj);
    });
  });
  