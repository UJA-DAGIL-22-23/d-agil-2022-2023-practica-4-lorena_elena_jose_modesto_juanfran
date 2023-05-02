/**
 * @file ms-Escalada-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Escalada en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Escalada Home"
const TITULO_ACERCA_DE = "Escalada Acerca de"

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

describe("Escalada.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Escalada.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Escalada.dDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Escalada.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Escalada.dDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Escalada.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Escalada.dDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Escalada.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Escalada.dDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Escalada.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Escalada.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Escalada.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Escalada.dDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Escalada.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Escalada.dDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Escalada.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Escalada.dDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Escalada.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Escalada.dDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Escalada.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Escalada.dDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Escalada.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Escalada.dDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Escalada.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Escalada.dDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Escalada.mostrarAcercaDe(datosDescargadosPrueba)
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
 - Escalada.descargarRuta
 - Escalada.procesarAcercaDe
 - Escalada.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
 describe("Escalada.pieTable  ", function () {
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(Escalada.pieTable()).toBe("</tbody></table>");
        });
});

describe("Escalada.cabeceraTableNombres", function () {
    it("debería devolver las etiquetas HTML para la cabecera de tabla",
        function () {
            expect(Escalada.cabeceraTableNombres()).toBe(`<table class="listado-personas"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th></thead><tbody>`);
        });
});

describe("Escalada.cuerpoTr", function () {
    it("debería comprobar que lo que muestra no esta vacío",
        function () {
            const p = {
                data: {
                    nombre: "Juan",
                    apellido: "Pérez",
                    direccion: {
                        calle: "Calle 123",
                        localidad: "Ciudad",
                        provincia: "Provincia",
                        pais: "País"
                    },
                    aniosParticipacionMundial: 5,
                    numeroParticipacionesOlimpicas: 3,
                    tipo: "Deportista"
                },
                ref: {
                    '@ref': {
                        id: "12345"
                    }
                }
            };
            const expected = `<tr title="12345">
            <td>12345</td>
            <td>Juan</td>
            <td> Pérez</td>
            <td>Calle 123,Ciudad,Provincia,País</td>
            <td>5</td>
            <td>3</td>
            <td>Deportista</td>
            </tr>`;
            expect(Escalada.cuerpoTr(p)).not.toBe('');
        });
});


describe("Escalada.imprimeNombres", function () {
    let vector;
    beforeEach(function () {
        // Crear un mock para el objeto Frontend.Article
        spyOn(Frontend.Article, "actualizar");
        // Crear un vector de nombres para usar como entrada en la función
        vector = ["Juan", "María", "Pedro"];
    });

    it("debería generar el mensaje correcto para el listado de nombres", function () {
        // Mockear las funciones Escalada.cabeceraTableNombres y Escalada.pieTable
        spyOn(Escalada, "cabeceraTableNombres");
        spyOn(Escalada, "pieTable");

        // Llamar a la función a probar
        spyOn(Escalada, "cuerpoTrNombres").and.callFake(function() {
            return true;
        });

        Escalada.imprimeNombres(vector);

        // Comprobar que se llamaron a las funciones de cabeceraTableNombres, cuerpoTrNombres y pieTable
        expect(Escalada.cabeceraTableNombres).toHaveBeenCalled();
        expect(Escalada.cuerpoTrNombres).toHaveBeenCalledTimes(vector.length);
        expect(Escalada.pieTable).toHaveBeenCalled();

        // Comprobar que se llamó a la función de Frontend.Article.actualizar con los argumentos correctos
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Listado de nombre de personas", jasmine.any(String));
    });
});
 

describe("Escalada.imprimeMostrar", function () {
    beforeEach(function () {
        // Mock de la función Frontend.Article.actualizar()
        spyOn(Frontend.Article, 'actualizar');
    });

    it("debería generar el mensaje de impresión y mostrado de persona correctamente", function () {
        const p = {
            data: {
                nombre: "Juan",
                apellido: "Pérez",
                direccion: {
                    calle: "Calle 123",
                    localidad: "Ciudad",
                    provincia: "Provincia",
                    pais: "País"
                },
                aniosParticipacionMundial: 5,
                numeroParticipacionesOlimpicas: 3,
                tipo: "Deportista"
            },
            ref: {
                '@ref': {
                    id: "12345"
                }
            }
        };
        let expectedMsj = Escalada.cabeceraTable() + Escalada.cuerpoTr(p) + Escalada.pieTable();
        
        Escalada.imprimeMostrar(p);
        
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Persona mostrada", expectedMsj);
    });
});

describe(" Escalada.imprime", function () {
    beforeEach(function () {
        // Mock de la función Frontend.Article.actualizar()
        spyOn(Frontend.Article, 'actualizar');
    });
    
    it("debería generar el mensaje de impresión y mostrado de personas correctamente", function () {
        // Definir un vector de ejemplo de personas
        let vectorPersonas = [
            {
                data: {
                    nombre: "Juan",
                    apellido: "Pérez",
                    direccion: {
                        calle: "Calle 123",
                        localidad: "Ciudad",
                        provincia: "Provincia",
                        pais: "País"
                    },
                    aniosParticipacionMundial: 5,
                    numeroParticipacionesOlimpicas: 3,
                    tipo: "Deportista"
                },
                ref: {
                    '@ref': {
                        id: "12345"
                    }
                }
            },
            {
                data: {
                    nombre: "María",
                    apellido: "Gómez",
                    direccion: {
                        calle: "Avenida 456",
                        localidad: "Pueblo",
                        provincia: "Región",
                        pais: "País"
                    },
                    aniosParticipacionMundial: 2,
                    numeroParticipacionesOlimpicas: 1,
                    tipo: "Deportista"
                },
                ref: {
                    '@ref': {
                        id: "67890"
                    }
                }
            },
            {
                data: {
                    nombre: "Pedro",
                    apellido: "Fernández",
                    direccion: {
                        calle: "Plaza 789",
                        localidad: "Villa",
                        provincia: "Estado",
                        pais: "País"
                    },
                    aniosParticipacionMundial: 3,
                    numeroParticipacionesOlimpicas: 2,
                    tipo: "Deportista"
                },
                ref: {
                    '@ref': {
                        id: "54321"
                    }
                }
            }
        ];
        
        // Llamamos a la función que genera el mensaje de impresión y mostrado de personas
        Escalada.imprime(vectorPersonas);
        
        // Verificamos que la función de actualización haya sido llamada con los argumentos correctos
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Listado de personas", jasmine.any(String));
    });
});

describe("Escalada.cuerpoTrNombres", function () {
    it("debería devolver la cadena HTML correcta para una fila de tabla con nombres",
        function () {
            const p = {
                data: {
                    nombre: "Juan",
                    apellido: "Pérez"
                },
                ref: {
                    "@ref": {
                        id: "12345"
                    }
                }
            };
            const expected = `<tr title="12345">
    <td>12345</td>
    <td>Juan</td>
    <td> Pérez</td>
    </tr>`;
            expect(Escalada.cuerpoTrNombres(p)).toBe(expected);
        });
});

describe("Escalada.cabeceraTable", function () {
    it("debería devolver la etiqueta HTML para la cabecera de la tabla", function () {
        var expectedOutput = `<table class="listado-personas">
        <thead>
        <th>ID</th><th>Nombre</th><th>Apellidos</th><th>Dirección</th><th>Años participación</th><th>Número participaciones</th><th>Tipo</th> 
        </thead>
        <tbody>
    `;
        expect(Escalada.cabeceraTable()).toBe(expectedOutput);
    });
});
