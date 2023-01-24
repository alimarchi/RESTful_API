// Importar express
const express = require("express");
const {verifyToken} = require("../lib/utils");
const router = express.Router();

// Importamos el modelo con el schema correspondiente
const Model = require("../Model/userModel");

// Escuchar peticiones get
router.get("/", verifyToken, async (req, res) => {
  // verifytoken para segurizar el endpoint

  // Model.find()
  //   .then((data) =>
  //     res.status(200).json({ status: "succeeded", data, error: null })
  //   )
  //   .catch((error) =>
  //     res.status(404).json({
  //       status: "failed",
  //       data: null,
  //       // ponemos null a data porque está fallando y no hay nada que enviar
  //       error: error.message,
  //     })
  //   );
  try {
    const data = await Model.find();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      data: null,
      // ponemos null a data porque está fallando y no hay nada que enviar
      error: error.message,
    });
  }
});

// Obtener documentos por id
router.get("/:id", (req, res) => {
  Model.findById(req.params.id)
    .exec()
    .then((data) =>
      res.status(200).json({ status: "succeeded", data, error: null })
    )
    .catch((error) =>
      res.status(404).json({
        status: "failed",
        data: null,
        // ponemos null a data porque está fallando y no hay nada que enviar
        error: error.message,
      })
    );
});

// Recibir documentos POST
router.post("/", (req, res) => {
  const data = new Model({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    role: req.body.role,
    skills: req.body.skills,
    personality: req.body.personality,
  });
  // estoy recogiendo la información de request que me llega del navegador
  data
    .save()
    .then((data) =>
      res.status(201).json({ status: "succeeded", data, error: null })
    )
    .catch((error) =>
      res.status(404).json({
        status: "failed",
        data: null,
        // ponemos null a data porque está fallando y no hay nada que enviar
        error: error.message,
      })
    );
});

// Actualizar documentos por id PATCH
router.patch("/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body;
  const options = {
    new: true,
  };
  Model.findByIdAndUpdate(id, data, options)
    .then((data) =>
      res.status(200).json({ status: "succeeded", data, error: null })
    )
    .catch((error) =>
      res.status(404).json({
        status: "failed",
        data: null,
        // ponemos null a data porque está fallando y no hay nada que enviar
        error: error.message,
      })
    );
});

// Borrar documentos DELETE
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  Model.findByIdAndDelete(id)
    .then((data) =>
      res.status(200).json({ status: "succeeded", data, error: null })
    )
    .catch((error) =>
      res.status(404).json({
        status: "failed",
        data: null,
        // ponemos null a data porque está fallando y no hay nada que enviar
        error: error.message,
      })
    );
});

module.exports = router;
