/**
 * @file front-end-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine
describe("Frontend.Article.actualizar: ", function () {
    const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
    const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
    const tituloPrueba = "Titulo de prueba"
    const contenidoPrueba = "Contenido de prueba"
    it("para títulos y contenidos nulos, debe dejar vacíos las correspondientes secciones del article",
        function () {
            // Probamos valores nulos
            Frontend.Article.actualizar()
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar(null, null)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar(null)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            // Probamos valores vacíos
            Frontend.Article.actualizar("")
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar("", "")
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")
        })
    it("Debe actualizar el titulo y el contenido de las secciones del article",
        function () {
            // Probamos solo el título
            Frontend.Article.actualizar(tituloPrueba)
            expect(elementoTitulo.innerHTML).toBe(tituloPrueba)
            expect(elementoContenido.innerHTML).toBe("")

            // Probamos solo el contenido
            Frontend.Article.actualizar("", contenidoPrueba)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe(contenidoPrueba)

            // Probamos ambos
            Frontend.Article.actualizar(tituloPrueba, contenidoPrueba)
            expect(elementoTitulo.innerHTML).toBe(tituloPrueba)
            expect(elementoContenido.innerHTML).toBe(contenidoPrueba)
        })
    it("Debe devolver el propio objeto",
        function () {
            // Probamos diversas llamadas con distintos parámetros
            expect(Frontend.Article.actualizar()).toBe(Frontend.Article) 
            expect(Frontend.Article.actualizar(tituloPrueba)).toBe(Frontend.Article)
            expect(Frontend.Article.actualizar(tituloPrueba, contenidoPrueba)).toBe(Frontend.Article)
        })

})
describe("Frontend.mostrarTodoAcercaDe: ", function () {
    beforeEach(function () {
        spyOn(Natacion, "descargarRuta");
        spyOn(Esgrima, "descargarRuta");
        spyOn(Ciclismo, "descargarRuta");
        spyOn(Escalada, "descargarRuta");
        spyOn(TenisDMesa, "descargarRuta");
        spyOn(Frontend, "mostrarAcercaDe");
    });

    it("llama a las rutas correspondientes y muestra los datos de Acerca De", function () {
        Frontend.mostrarTodoAcercaDe();

        expect(Natacion.descargarRuta).toHaveBeenCalledWith("/Natacion/acercade", Frontend.mostrarAcercaDe);
        expect(Esgrima.descargarRuta).toHaveBeenCalledWith("/Esgrima/acercade", Frontend.mostrarAcercaDe);
        expect(Ciclismo.descargarRuta).toHaveBeenCalledWith("/Ciclismo/acercaDe", Frontend.mostrarAcercaDe);
        expect(Escalada.descargarRuta).toHaveBeenCalledWith("/Escalada/acercaDe", Frontend.mostrarAcercaDe);
        expect(TenisDMesa.descargarRuta).toHaveBeenCalledWith("/TenisDMesa/acercade", Frontend.mostrarAcercaDe);
    });

    it("establece el mensaje de AcercaDeMsj como vacío al inicio", function () {
        Frontend.mostrarTodoAcercaDe();

        expect(Frontend.AcercaDeMsj).toBe("");
    });
});

  