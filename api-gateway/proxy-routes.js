/**
 * @file proxy-routes.js
 * @description Objeto que almacena las rutas que deben ser consideradas por el proxy.
 * Cualquier URL que empiece por /personas es derivada al ms de personas; igual para /proyectos, etc.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const ROUTES = [
    {
        url: '/TenisDMesa',
        proxy: {
            target: "http://localhost:8006",
            changeOrigin: true,
            pathRewrite: {
                [`^/TenisDMesa`]: '',
            },
        }
    },
    {
        url: '/Natacion',
        proxy: {
            target: "http://localhost:8005",
            changeOrigin: true,
            pathRewrite: {
                [`^/Natacion`]: '',
            },
        }
    },
    {
        url: '/Esgrima',
        proxy: {
            target: "http://localhost:8004",
            changeOrigin: true,
            pathRewrite: {
                [`^/Esgrima`]: '',
            },
        }
    },
    {
        url: '/Escalada',
        proxy: {
            target: "http://localhost:8003",
            changeOrigin: true,
            pathRewrite: {
                [`^/Escalada`]: '',
            },
        }
    },{
        url: '/Ciclismo',
        proxy: {
            target: "http://localhost:8002",
            changeOrigin: true,
            pathRewrite: {
                [`^/Ciclismo`]: '',
            },
        }
    }
]

exports.routes = ROUTES;