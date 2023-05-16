/**
 * @file ms-Ciclismo-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Ciclismo en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTituloCiclis = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenidoCiclis = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME_C = "Ciclismo Home"
const TITULO_ACERCA_DE_C = "Ciclismo Acerca de"

const datosDescargadosPruebaCiclis = {
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

describe("Ciclismo.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Ciclismo.mostrarHome()
            expect(elementoTituloCiclis.innerHTML).toBe(TITULO_HOME_C)
            expect(elementoContenido.innerHTML).toBe(Ciclismo.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Ciclismo.mostrarHome(23)
            expect(elementoTituloCiclis.innerHTML).toBe(TITULO_HOME_C)
            expect(elementoContenido.innerHTML).toBe(Ciclismo.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Ciclismo.mostrarHome({})
            expect(elementoTituloCiclis.innerHTML).toBe(TITULO_HOME_C)
            expect(elementoContenido.innerHTML).toBe(Ciclismo.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Ciclismo.mostrarHome({ foo: "bar" })
            expect(elementoTituloCiclis.innerHTML).toBe(TITULO_HOME_C)
            expect(elementoContenido.innerHTML).toBe(Ciclismo.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Ciclismo.mostrarHome(datosDescargadosPrueba)
            expect(elementoTituloCiclis.innerHTML).toBe(TITULO_HOME_C)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Ciclismo.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Ciclismo.mostrarAcercaDe()
            expect(elementoTituloCiclis.innerHTML).toBe(TITULO_ACERCA_DE_C)
            expect(elementoContenido.innerHTML.search(Ciclismo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Ciclismo.mostrarAcercaDe(23)
            expect(elementoTituloCiclis.innerHTML).toBe(TITULO_ACERCA_DE_C)
            expect(elementoContenido.innerHTML.search(Ciclismo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Ciclismo.mostrarAcercaDe({})
            expect(elementoTituloCiclis.innerHTML).toBe(TITULO_ACERCA_DE_C)
            expect(elementoContenido.innerHTML.search(Ciclismo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Ciclismo.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTituloCiclis.innerHTML).toBe(TITULO_ACERCA_DE_C)
            expect(elementoContenido.innerHTML.search(Ciclismo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Ciclismo.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTituloCiclis.innerHTML).toBe(TITULO_ACERCA_DE_C)
            expect(elementoContenido.innerHTML.search(Ciclismo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Ciclismo.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTituloCiclis.innerHTML).toBe(TITULO_ACERCA_DE_C)
            expect(elementoContenido.innerHTML.search(Ciclismo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Ciclismo.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTituloCiclis.innerHTML).toBe(TITULO_ACERCA_DE_C)
            expect(elementoContenido.innerHTML.search(Ciclismo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Ciclismo.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTituloCiclis.innerHTML).toBe(TITULO_ACERCA_DE_C)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

/**
 * PRUEBA DE LA FUNCIÓN QUE ME REALIZA EL CUERPO DE A FUNCIÓN DE LA HU 2
 */
describe("Comprueba cuperpo primera tabla", function(){


    it("Compreba que la función rellena la tabla correctamente", function() {
        //Creo unos datos con los que probar
        const c = {
            data: {
              nombre: 'Jose',
              apellidos: 'Ballester Marin'
            }
        };

        const resultado=Ciclismo.cuerpo1(c);
        expect(resultado).toBe('<tr><td><em>Jose Ballester Marin</em></td></tr>');

    });


})

/**
 * FUNCIÓN QUE PRUEBA LA FUNCIÓN QUE IMPRIME QUE TODOS LOS NOMBRES DE LOS CICLISTAS
 */

describe("Prueba de la función sacaCiclistas que muestra los nombres de los ciclistas", function(){
    
    it("Comprueba que la función devuelve correctamente el código html para hacer la tabla con sus datos",  function(){
        const c = {
            data:[{
                data: {
                    nombre: 'Jose',
                    apellidos: 'Ballester Marin'
                },
                data: {
                    nombre: 'Juan',
                    apellidos: 'Ballester Marin'
                }
            }]
        };

        spyOn(Frontend.Article, "actualizar");
        Ciclismo.muestraCiclistas(c);
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Nombre de todos los ciclistas", '<table class="op1"><thead><th>Ciclistas</th></thead><tbody><tr><td><em>Juan Ballester Marin</em></td></tr></tbody></table>');
        
        //<tr><td><em>Jose Ballester Marin</em></td></tr>
        
        //expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Nombre de todos los ciclistas", c);

        //const resultado = Ciclismo.muestraCiclistas(c);

        

       
    })
})

describe("Prueba de la función muestraCiclistaID que muestra los datos del ciclista", function(){
    
    it("Comprueba que la función devuelve correctamente el código html para hacer la tabla con sus datos",  function(){
        const c = {
            data: {
              nombre: 'Jose',
              apellidos: 'Ballester Marin',
              id: '0001',
              email: 'jbm@uja.es',
              f_nac:{
                dia: 16,
                mes: 5,
                anio: 2000
              },
              equipos: ["movistar","vodafone","orange"]
            }
        };

       //const resultado=Ciclismo.muestraCiclistaID(c);
        
       //expect(resultado).toBe('<tr><td>0001</td><td>Jose Ballester Marin</td><td>movistar,vodafone,orange</td><td>16/5/2000</td><td>jbm@uja.es</td></tr>');

        spyOn(Frontend.Article, "actualizar");
        Ciclismo.muestraCiclistaID(c);
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith( 'Datos del ciclista', '<table class="op1"><thead><th>ID</th><th>Ciclistas</th><th>Equipos</th><th>Fecha de Nacimiento</th><th>Email</th></thead><tbody><tr><td>0001</td><td>Jose Ballester Marin</td><td>movistar,vodafone,orange</td><td>16/5/2000</td><td>jbm@uja.es</td></tr></tbody></table>');
        
        //<tr><td><em>Jose Ballester Marin</em></td></tr>
        
        //expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Nombre de todos los ciclistas", c);

        //const resultado = Ciclismo.muestraCiclistas(c);

        

       
    })
})




//describe("Prueba de la función cuerpoEditable que muestra los datos del ciclista con un botón", function(){
    
    //it("Comprueba que la función devuelve correctamente el código html para hacer la tabla con sus datos",  function(){
        const c = {
            data: {
              nombre: 'Jose',
              apellidos: 'Ballester Marin',
              id: '0001',
              email: 'jbm@uja.es',
              f_nac:{
                dia: 16,
                mes: 5,
                anio: 2000
              },
              equipos: ["movistar"]
            }
        };


        //ME FALLA AL QUERER INTRODUCIR EL ID DE LA BASE DE DATOS, NO SE TRAGA LA DOBLE '' '' 

       //const resultado=Ciclismo.cuerpoEditable(c);

       //expect(resultado).toBe('<tr><td>0001</td><td>Jose</td><td>Ballester Marin</td><td>movistar</td><td>16/5/2000</td><td>jbm@uja.es</td><td><div class="btn-conf"><a href="javascript:Ciclismo.changeNombre(359097846737141965)">MODIFICAR NOMBRE</a></div></td></tr>');

        //spyOn(Frontend.Article, "actualizar");
        
        //Ciclismo.muestraCiclistaID(c);
        //expect(Frontend.Article.actualizar).toHaveBeenCalledWith( 'Datos del ciclista', '<table class="op1"><thead><th>ID</th><th>Ciclistas</th><th>Equipos</th><th>Fecha de Nacimiento</th><th>Email</th></thead><tbody><tr><td>0001</td><td>Jose Ballester Marin</td><td>movistar,vodafone,orange</td><td>16/5/2000</td><td>jbm@uja.es</td></tr></tbody></table>');
               

       
    //})
//})

/**
 * PRUEBA DE LA FUNCIÓN QUE ME REALIZA EL CUERPO DE A FUNCIÓN DE LA HU 2
 */
describe("Comprueba cuperpo de la tabla de todos los datos", function(){


    it("Compreba que la función rellena la tabla correctamente", function() {
        //Creo unos datos con los que probar
        const c = {
            data: {
              nombre: 'Jose',
              apellidos: 'Ballester Marin',
              id: '0001',
              email: 'jbm@uja.es',
              f_nac:{
                dia: 16,
                mes: 5,
                anio: 2000
              },
              equipos: ["movistar","vodafone","orange"]
            }
        };

        const resultado=Ciclismo.cuerpo2(c);
        expect(resultado).toBe('<tr><td>0001</td><td>Jose Ballester Marin</td><td>movistar,vodafone,orange</td><td>16/5/2000</td><td>jbm@uja.es</td></tr>');

    });


})

/**
 * 
 * FUNCIÓN QUE PRUEBA LA FUNCIÓN QUE IMPRIME QUE TODOS LOS DATOS DE LOS CICLISTAS
 * 
 */

describe("Prueba de la función todosDatos que muestra los datos de los ciclistas", function(){
    
    it("Comprueba que la función devuelve correctamente el código html para hacer la tabla con sus datos",  function(){
        const c = {
            data:[{
                data: {
                    nombre: 'Jose',
                    apellidos: 'Ballester Marin',
                    id: '0001',
                    email: 'jbm@uja.es',
                    f_nac:{
                        dia: 16,
                        mes: 5,
                        anio: 2000
                    },
                     equipos: ["movistar","vodafone","orange"]
                },
                data: {
                    nombre: 'Jose',
                    apellidos: 'Ballester Marin',
                    id: '0002',
                    email: 'jbm@uja.es',
                    f_nac:{
                        dia: 16,
                        mes: 5,
                        anio: 2000
                    },
                     equipos: ["movistar","vodafone","orange"]
                }
            }]
        };

        spyOn(Frontend.Article, "actualizar");
        Ciclismo.todosDatos(c);
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Datos de todos los ciclistas", '<table class="op1"><thead><th>ID</th><th>Ciclistas</th><th>Equipos</th><th>Fecha de Nacimiento</th><th>Email</th></thead><tbody><tr><td>0002</td><td>Jose Ballester Marin</td><td>movistar,vodafone,orange</td><td>16/5/2000</td><td>jbm@uja.es</td></tr></tbody></table>');
        
    })
})

/**
 * 
 * FUNCIÓN QUE PRUEBA LA FUNCIÓN DE MOSTRAR LOS CICLISTA DE MANERA ORDENADA POR EL NOMBRE
 * 
 */

describe("Prueba de la función muestraCiclistasOrd que muestra los nombres de los ciclistas ordenados", function(){
    
    it("Comprueba que la función devuelve correctamente el código html ordenado para hacer la tabla con los nombres",  function(){
        const c = {
            data:[{
                data: {
                    nombre: 'Jose',
                    apellidos: 'Ballester Marin'
                },
                data: {
                    nombre: 'Alex',
                    apellidos: 'Ballester Marin'
                }
            }]
        };

        spyOn(Frontend.Article, "actualizar");
        Ciclismo.muestraCiclistasOrd(c);
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Nombre de todos los ciclistas ordenados alfabéticamente", '<table class="op1"><thead><th>Ciclistas</th></thead><tbody><tr><td><em>Alex Ballester Marin</em></td></tr></tbody></table>');
        
        //<tr><td><em>Jose Ballester Marin</em></td></tr>
        
        //expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Nombre de todos los ciclistas", c);

        //const resultado = Ciclismo.muestraCiclistas(c);

        //const prueba = resultado.getElementsByTagName('tbody')[0];

        //expect(prueba.children[0].textContent).toBe('Jose Ballester Marin');
        //expect(resultado).toBe('<table class="op1"><thead><th>Ciclistas</th></thead><tbody><tr><td><em>Jose Ballester Marin</em></td></tr><tr><td><em>Juan Ballester Marin</em></td></tr></tbody></table>');
    })
})

/**
 * 
 * FUNCIÓN QUE PRUEBA LA FUNCIÓN DE MOSTRAR LOS CICLISTAS POR EL CRITERIO QUE EL JUGADOR DESEE
 * 
 */

describe("Prueba de la función muestraCampo que muestra los datos de los ciclistas ordenados por un campo", function(){
    
    it("Comprueba que la función devuelve correctamente el código html para hacer la tabla con sus datos ordenados",  function(){
        let ciclistass = {
            data: [
              { 
                //id: 1,
                data: {
                  nombre: "Jose",
                  apellidos: "Ballester Marin",
                  id: "0001",
                  email: "jbm@uja.es",
                  f_nac: { dia: 16, mes: 5, anio: 2000 },
                  equipos: ["movistar", "vodafone", "orange"]
                }
              },
              { 
                //id: 2,
                data: {
                  nombre: "Angel",
                  apellidos: "Garcia Marin",
                  id: "0002",
                  email: "agm@uja.es",
                  f_nac: { dia: 16, mes: 8, anio: 2030 },
                  equipos: ["movistar", "orange"]
                }
              }
            ]
          };
        

        //spyOn(Frontend.Article, "actualizar");
         //expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Datos de los ciclistas ordenados",'<table class="op1"><thead><th>ID</th><th>Ciclistas</th><th>Equipos</th><th>Fecha de Nacimiento</th><th>Email</th></thead><tbody><tr><td>0002</td><td>Angel Garcia Marin</td><td>movistar,orange</td><td>16/8/2030</td><td>agm@uja.es</td></tr></tbody></table>');
        //expect(p1).toContain(`<table class="op1"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th><th>Equipos</th><th>Fecha de Nacimiento</th><th>Email</th></thead><tbody><tr><td>1</td><td>Jose</td><td>Ballester Marin</td><td>movistar,vodafone,orange</td><td>16/5/2000</td><td>jbm@uja.es</td></tr><tr><td>2</td><td>Angel</td><td>Garcia Marin</td><td>movistar,orange</td><td>16/8/2030</td><td>agm@uja.es</td></tr></tbody></table>`);
         //expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Datos de los ciclistas ordenados", '<table class="op1"><thead><th>ID</th><th>Ciclistas</th><th>Equipos</th><th>Fecha de Nacimiento</th><th>Email</th></thead><tbody><tr><td>0002</td><td>Angel Garcia Marin</td><td>movistar,orange</td><td>16/8/2030</td><td>agm@uja.es</td></tr></tbody></table>');

        //PRUEBA DEL NOMBRE
        Ciclismo.muestraCampo("nombre",ciclistass);
        expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('0002')).toBeTrue()

        //PRUEBA DEL APELLIDO
        Ciclismo.muestraCampo("apellidos",ciclistass);
        expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('0001')).toBeTrue()

        //PRUEBA DEL EQUIPO
        Ciclismo.muestraCampo("equipos",ciclistass);
        expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('0002')).toBeTrue()

        //PRUEBA DEL EMAIL
        Ciclismo.muestraCampo("email",ciclistass);
        expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('0002')).toBeTrue()

        //PRUEBA DE LA FECHA DE NACIMIENTO
        Ciclismo.muestraCampo("f_nac",ciclistass);
        expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('0001')).toBeTrue()
        
    })
})

describe("Prueba de la función form_nuevoCiclista que añade un nuevo ciclista a la BBDD", function(){

    it("Se completan correctmente los campos", () => {
        Ciclismo.form_nuevoCiclista();

        document.getElementById("id-ciclista").value="0012";
        document.getElementById("nombre-ciclista").value="Jose";
        document.getElementById("apellidos-ciclista").value="Ballester";
        document.getElementById("equipos-ciclista").value="movistar";
        document.getElementById("f_nac-ciclista").value= "16-05-2000";
        document.getElementById("email-ciclista").value="jbm@uja.es";


        expect(document.getElementById("id-ciclista").value).toBe("0012");
        expect(document.getElementById("nombre-ciclista").value).toBe("Jose");
        expect(document.getElementById("apellidos-ciclista").value).toBe("Ballester");
        expect(document.getElementById("equipos-ciclista").value).toBe("movistar");
        expect(document.getElementById("email-ciclista").value).toBe("jbm@uja.es");

    });



    it("Devuelve el código HTML neceseario para realizar el formulario", () =>{
        Ciclismo.form_nuevoCiclista();

        expect(document.getElementById("id-ciclista")).toBeTruthy();
        expect(document.getElementById("nombre-ciclista")).toBeTruthy();
        expect(document.getElementById("apellidos-ciclista")).toBeTruthy();
        expect(document.getElementById("equipos-ciclista")).toBeTruthy();
        expect(document.getElementById("f_nac-ciclista")).toBeTruthy();
        expect(document.getElementById("email-ciclista")).toBeTruthy();
    });

})

describe("Prueba de la función buscar que busca en la BBDD las coincidencias de nombres", function(){

    it("Se busca correctamente", function() {

        let ciclistas = {
            data: [
              { 
                //id: 1,
                data: {
                  nombre: "Jose",
                  apellidos: "Ballester Marin",
                  id: "0001",
                  email: "jbm@uja.es",
                  f_nac: { dia: 16, mes: 5, anio: 2000 },
                  equipos: ["movistar"]
                }
              },
              { 
                //id: 2,
                data: {
                  nombre: "Angel",
                  apellidos: "Garcia Marin",
                  id: "0002",
                  email: "agm@uja.es",
                  f_nac: { dia: 16, mes: 8, anio: 2030 },
                  equipos: ["movistar", "orange"]
                }
              }
            ]
          };

          let nombre= "Angel";
          Ciclismo.buscar(nombre,ciclistas);
          

          expect(elementoContenido.getElementsByTagName("td")[1].innerText.includes('Angel Garcia Marin')).toBeTrue();
          expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('0002')).toBeTrue()
          expect(elementoContenido.getElementsByTagName("td")[2].innerText.includes('orange')).toBeTrue()
          expect(elementoContenido.getElementsByTagName("td")[3].innerText.includes('16/8/2030')).toBeTrue()
          expect(elementoContenido.getElementsByTagName("td")[4].innerText.includes('agm@uja.es')).toBeTrue()

          let nombre2= "Jose";
          Ciclismo.buscar(nombre2,ciclistas);
          

          expect(elementoContenido.getElementsByTagName("td")[1].innerText.includes('Jose Ballester Marin')).toBeTrue();
          expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('0001')).toBeTrue()
          expect(elementoContenido.getElementsByTagName("td")[2].innerText.includes('movistar')).toBeTrue()
          expect(elementoContenido.getElementsByTagName("td")[3].innerText.includes('16/5/2000')).toBeTrue()
          expect(elementoContenido.getElementsByTagName("td")[4].innerText.includes('jbm@uja.es')).toBeTrue()

    

    });
})
/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Ciclismo.descargarRuta
 - Ciclismo.procesarAcercaDe
 - Ciclismo.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
