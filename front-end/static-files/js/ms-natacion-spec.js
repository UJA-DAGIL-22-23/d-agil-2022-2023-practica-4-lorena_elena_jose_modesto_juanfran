/**
 * @file ms-Natacion-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Natacion en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulonata = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenidonata = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOMEnata = "Natacion Home"
const TITULO_ACERCA_DEnata = "Natacion Acerca de"
const TITULO_Natacionnata = "Listado de Natacions"
const TITULO_NOMBRESnata = "Listado de nombres"

const datosDescargadosPruebanata = {
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

describe("Natacion.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Natacion.mostrarHome()
            expect(elementoTitulonata.innerHTML).toBe(TITULO_HOMEnata)
            expect(elementoContenidonata.innerHTML).toBe(Natacion.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Natacion.mostrarHome(23)
            expect(elementoTitulonata.innerHTML).toBe(TITULO_HOMEnata)
            expect(elementoContenidonata.innerHTML).toBe(Natacion.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Natacion.mostrarHome({})
            expect(elementoTitulonata.innerHTML).toBe(TITULO_HOMEnata)
            expect(elementoContenidonata.innerHTML).toBe(Natacion.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Natacion.mostrarHome({ foo: "bar" })
            expect(elementoTitulonata.innerHTML).toBe(TITULO_HOMEnata)
            expect(elementoContenidonata.innerHTML).toBe(Natacion.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Natacion.mostrarHome(datosDescargadosPruebanata)
            expect(elementoTitulonata.innerHTML).toBe(TITULO_HOMEnata)
            expect(elementoContenidonata.innerHTML).toBe(datosDescargadosPruebanata.mensaje)
        })
})


describe("Natacion.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Natacion.mostrarAcercaDe()
            expect(elementoTitulonata.innerHTML).toBe(TITULO_ACERCA_DEnata)
            expect(elementoContenidonata.innerHTML.search(Natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Natacion.mostrarAcercaDe(23)
            expect(elementoTitulonata.innerHTML).toBe(TITULO_ACERCA_DEnata)
            expect(elementoContenidonata.innerHTML.search(Natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Natacion.mostrarAcercaDe({})
            expect(elementoTitulonata.innerHTML).toBe(TITULO_ACERCA_DEnata)
            expect(elementoContenidonata.innerHTML.search(Natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Natacion.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulonata.innerHTML).toBe(TITULO_ACERCA_DEnata)
            expect(elementoContenidonata.innerHTML.search(Natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Natacion.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulonata.innerHTML).toBe(TITULO_ACERCA_DEnata)
            expect(elementoContenidonata.innerHTML.search(Natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Natacion.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulonata.innerHTML).toBe(TITULO_ACERCA_DEnata)
            expect(elementoContenidonata.innerHTML.search(Natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Natacion.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulonata.innerHTML).toBe(TITULO_ACERCA_DEnata)
            expect(elementoContenidonata.innerHTML.search(Natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Natacion.mostrarAcercaDe(datosDescargadosPruebanata)
            expect(elementoTitulonata.innerHTML).toBe(TITULO_ACERCA_DEnata)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenidonata.innerHTML.search(datosDescargadosPruebanata.autor) >= 0).toBeTrue()
            expect(elementoContenidonata.innerHTML.search(datosDescargadosPruebanata.email) >= 0).toBeTrue()
            expect(elementoContenidonata.innerHTML.search(datosDescargadosPruebanata.fecha) >= 0).toBeTrue()

        })
})



/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Natacion.descargarRuta
 - Natacion.procesarAcercaDe
 - Natacion.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */

// SPECS para Jasmine

//TDD para la Historia de Usuario 2 y 3 (HU 2 y HU 3)
describe("Natacion.pieTable ", function () {
    it("debería devolver las etiquetas HTML para el pie de tabla cuando se le pasa un valor nulo", function() {
        expect(Natacion.pieTable()).not.toBe(null);
    });
    it("debería devolver las etiquetas HTML para el pie de tabla cuando se le pasa un valor vacío", function() {
        expect(Natacion.pieTable()).not.toBe("");
    });
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(Natacion.pieTable()).toBe("</tbody></table>");
        });
});


describe("Natacion.TableNombres", function () {
    it("debería devolver un string vacío si se le pasa un valor nulo",
    function () {
        expect(Natacion.cabeceraTableNombres()).not.toBe(null);
    });
    it("debería devolver un string vacío si se le pasa un valor vacío",
    function () {
        expect(Natacion.cabeceraTableNombres()).not.toBe("");
    });
    it("debería devolver las etiquetas HTML para la cabecera de tabla",
        function () {
            expect(Natacion.cabeceraTableNombres()).toBe(`<table class="listado-Natacion"><thead><th>Nombres</th><th>Apellidos</th></thead><tbody>`);
        });
});


describe('Natacion.cuerpoTrNombres', function () {
    // Preparar los datos de la prueba
    const p = {
        ref: { "@ref": { id: "ref persona 1" } },
        data: {
            Nombre_completo: { Nombre: "Mireia", Apellidos: "Belmonte García" }
        }
    }
    // Realizar los expect
    it("debería devolver una cadena vacía si se le pasa un valor nulo", function () {
        expect(Natacion.cuerpoTrNombres(p)).not.toBe(null);
    });

    it("debería devolver una cadena vacía si se le pasa una cadena vacía", function () {
        expect(Natacion.cuerpoTrNombres(p)).not.toBe("");
    });
    it("debería devolver una cadena que contenga los nombres de la Natacion",
        function () {
            expect(Natacion.cuerpoTrNombres(p)).toBe(`<tr title="${p.ref['@ref'].id}"><td>${p.data.Nombre_completo.Nombre}</td><td>${p.data.Nombre_completo.Apellidos}</td></tr>`);
        });
});



describe('Natacion.imprimeNombres', function () {
    // Preparar los datos de la prueba
    const vector = [
        {
            ref: { "@ref": { id: "ref persona 1" } },
            data: { Nombre_completo: { Nombre: "Mireia", Apellidos: "Belmonte García" } }
        },
        {
            ref: { "@ref": { id: "ref persona 2" } },
            data: { Nombre_completo: { Nombre: "Lionel", Apellidos: "Messi" } }
        }
    ];

    // Realizo los expect
    it("debería mostrar una tabla con los nombres de las Natacions en Frontend.Article",
        function () {
            const expectedMsj = Natacion.cabeceraTableNombres() + Natacion.cuerpoTrNombres(vector[0]) + Natacion.cuerpoTrNombres(vector[1]) + Natacion.pieTable();
            spyOn(Frontend.Article, 'actualizar');
            Natacion.imprimeNombres(vector);
            expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de nombres', expectedMsj);
        });
});


//TDD para la Historia de Usuario 4 (HU 4)
describe("Natacion.cabeceraTable", function () {
    // Realizo los expect
    it("debería devolver una cadena vacía si se le pasa un valor nulo", function () {
        expect(Natacion.cabeceraTable()).not.toBe(null);
    });

    it("debería devolver una cadena vacía si se le pasa una cadena vacía", function () {
        expect(Natacion.cabeceraTable()).not.toBe("");
    });
    it("debería devolver las etiquetas HTML para la cabecera de tabla",
        function () {
            expect(Natacion.cabeceraTable()).toBe(`<table class="listado-Natacion"><thead><th>Nombre</th><th>Apellidos</th><th>Fecha</th><th>Direccion</th><th>Años participación</th><th>Nº participaciones mundiales en JJOO</th><th>Mejor estilo de natación</th></thead><tbody>`);
        });
});


describe('Natacion.cuerpoTr', function () {
    // Preparar los datos de la prueba
    const p = {
        ref: { "@ref": { id: "ref persona 1" } },
        data: {
            Nombre_completo: { Nombre: "Mireia", Apellidos: "Belmonte García" },
            Fecha: { dia: 1, mes: 1, año: 2000 },
            Direccion: {
                calle: "Calle Falsa 123",
                localidad: "Springfield",
                provincia: "Estados Unidos",
                pais: "EEUU",
            },
            Anios_participacion_en_mundial: 2,
            Num_participaciones_mundiales_JJOO: 1,
            Mejor_estilo_natacion: "Mariposa",
        }
    }

    // Realizo los expect
    it("debería devolver una cadena vacía si se le pasa un valor nulo", function () {
    expect(Natacion.cuerpoTr(p)).not.toBe(null);
    });

    it("debería devolver una cadena vacía si se le pasa una cadena vacía", function () {
        expect(Natacion.cuerpoTr(p)).not.toBe("");
    });

    it("debería devolver una cadena que contenga todos los datos de la Natacion de personas",
        function () {
            expect(Natacion.cuerpoTr(p)).toBe(`<tr title="${p.ref['@ref'].id}"><td>${p.data.Nombre_completo.Nombre}</td><td>${p.data.Nombre_completo.Apellidos}</td><td>${p.data.Fecha.dia}/${p.data.Fecha.mes}/${p.data.Fecha.año}</td><td>${p.data.Direccion.calle}, ${p.data.Direccion.localidad}, ${p.data.Direccion.provincia}, ${p.data.Direccion.pais}</td><td>${p.data.Anios_participacion_en_mundial}</td><td>${p.data.Num_participaciones_mundiales_JJOO}</td><td>${p.data.Mejor_estilo_natacion}</td></tr>`);
        });
});


describe('Natacion.imprime', function () {
    // Preparar los datos de la prueba
    const vector = [
        {
            ref: { "@ref": { id: "ref persona 1" } },
            data: { 
                Nombre_completo: { Nombre: "Mireia", Apellidos: "Belmonte García" },
                Fecha: { dia: 1, mes: 1, año: 2000 },
                Direccion: {
                    calle: "Calle Falsa 123",
                    localidad: "Springfield",
                    provincia: "Estados Unidos",
                    pais: "EEUU",
                },
                Anios_participacion_en_mundial: 2,
                Num_participaciones_mundiales_JJOO: 1,
                Mejor_estilo_natacion: "Mariposa",
            }
        },
        {
            ref: { "@ref": { id: "ref persona 2" } },
            data: { 
                Nombre_completo: { Nombre: "Lionel", Apellidos: "Messi" },
                Fecha: { dia: 1, mes: 1, año: 2000 },
                Direccion: {
                    calle: "Calle Falsa 123",
                    localidad: "Springfield",
                    provincia: "Estados Unidos",
                    pais: "EEUU",
                },
                Anios_participacion_en_mundial: 2,
                Num_participaciones_mundiales_JJOO: 1,
                Mejor_estilo_natacion: "Mariposa",
        }
        }
    ];

    // Realizo los expect  
    it("debería mostrar una tabla con todos los datos de las Natacions de personas en Frontend.Article",
        function () { 
            const expectedMsj = Natacion.cabeceraTable() + Natacion.cuerpoTr(vector[0]) + Natacion.cuerpoTr(vector[1]) + Natacion.pieTable();
            spyOn(Frontend.Article, 'actualizar');
            Natacion.imprime(vector);
            expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de Natacions', expectedMsj);
        });
});


//TDD para la Historia de Usuario 6 (HU 6)
describe('Natacion.imprimeUnaPersona', function () {
    // Preparar los datos de la prueba
    const p = {
        ref: { "@ref": { id: "ref persona 1" } },
        data: {
            Nombre_completo: { Nombre: "Mireia", Apellidos: "Belmonte García" },
            Fecha: { dia: 1, mes: 1, año: 2000 },
            Direccion: {
                calle: "Calle Feliz",
                localidad: "Springfield",
                provincia: "Estados Unidos",
                pais: "EEUU",
            },
            Anios_participacion_en_mundial: 2,
            Num_participaciones_mundiales_JJOO: 1,
            Mejor_estilo_natacion: "Mariposa",
        }
    }
    // Realizo los expect
    it("debería mostrar una tabla con todos los datos de una persona en Frontend.Article",
        function () {
            const expectedMsj = Natacion.cabeceraTable() + Natacion.cuerpoTr(p) + Natacion.pieTable();
            spyOn(Frontend.Article, 'actualizar');
            Natacion.imprimeUnaPersona(p);
            expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Mostrar una persona', expectedMsj);
        });
});
  