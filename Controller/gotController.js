// Importar express
const express = require("express");
const router = express.Router();

// Importamos el modelo con el schema correspondiente
const Model = require("../Model/gotModel");

// Petición get para devolver todas las casas
router.get("/", async (req, res) => {
  try {
    const data = await Model.find();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
});
