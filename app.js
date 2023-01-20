// Cargamos el módulo http en el servidor
const http = require("http");
// Seleccionamos el puerto 8000 para evitar conflictos con el front, puerto 3000
const PORT = 8000;
// Creamos un servidor http con una función callback que gestione los códigos de respuesta (req=require - la información que nos llega del front, res=response)
const server = http.createServer(
    // request contiene los detalles de la solicitud
    // response enviará la respuesta al cliente
    (req, res) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>Hello, World!!!</h1>");
    }
).listen(PORT, () => {console.log(`Server running at http://localhost:${PORT}`)})