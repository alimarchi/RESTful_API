// Importar los módulos express y mongoose
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

// nos permite sacar la info del archivo .env
require("dotenv").config();
// almaceno la cadena de conexión
const mongoString = process.env.DATABASE_URL;

// vamos a conectar con la bbdd
mongoose.connect(mongoString, { useNewUrlParser: true });
// guardamos la conexión
const db = mongoose.connection;
// verificar si la conexión ha sido exitosa
db.on("error", (error) => {
  console.log(error);
});
// se ejecuta una única vez (por eso uso once y no on), cuando se conecta a la bbdd, en lugar de en cada petición
db.once("connected", () => {
  console.log("Successfully connected");
});
// recibir una notificación cuando la conexión se haya cerrado
db.on("disconnected", () => {
  console.log("Mongoose default connection is disconnected");
});

// Importación de controladores
const users = require("./Controller/userController");

const PORT = 8000;
// Crear la app
const app = express();
// Analizar los archivos json
app.use(express.json());

app.use("/houses", houses);

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});


