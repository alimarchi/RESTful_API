// Importar express
const express = require("express");
const router = express.Router();

// Escuchar peticiones get
router.get("/", (req, res) => {
  res.send("GET collection");
});

// Obtener documentos por id
router.get("/:id", (req, res) => {
  res.send(`GET document id ${req.params.id}`);
});

// Recibir documentos POST
router.post("/", (req, res) => {
  res.send("POST collection");
});

// Actualizar documentos por id PATCH
router.patch("/:id", (req, res) => {
  res.send(`UPDATE document id ${req.params.id}`);
});

// Borrar documentos DELETE
router.delete("/:id", (req, res) => {
  res.send(`DELETE document id ${req.params.id}`);
});

module.exports = router;
