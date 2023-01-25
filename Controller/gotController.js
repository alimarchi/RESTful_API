// Importar express
const express = require("express");
const router = express.Router();

// Importamos el modelo con el schema correspondiente
const Model = require("../Model/gotModel");

// GET/houses - Petición get para devolver todas las casas
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

// GET/houses/:id - Petición get para devolver la casa con el id indicado
router.get("/:id", (req, res) => {
  Model.findById(req.params.id)
    .exec()
    .then((data) =>
      res.status(200).json({ status: "succeeded", data, error: null })
    )
    .catch((error) =>
      res
        .status(404)
        .json({ status: "failed", data: null, error: error.message })
    );
});

// POST /houses - Crear una nueva casa
router.post("/", (req, res) => {
  const data = new Model({
    name: req.body.name,
    words: req.body.words,
    description: req.body.description,
    sigil: req.body.sigil,
    leader: req.body.leader,
    region: req.body.region,
    settlements: req.body.settlements,
    religion: req.body.religion,
    allies: req.body.allies,
    enemies: req.body.enemies,
    members: req.body.members,
  });
  data
    .save()
    .then((data) =>
      res.status(201).json({ status: "succedeed", data, error: null })
    )
    .catch((error) =>
      res
        .status(404)
        .json({ status: "failed", data: null, error: error.message })
    );
});

// PATCH /houses/:id - Actualizar la casa con el id indicado
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
        error: error.message,
      })
    );
});

// DELETE /houses/:id - Elimina la casa con el id indicado
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

// GET /houses/members/:id - devuelve los miembros de la casa con el id indicado
router.get("/members/:id", (req, res) => {
  Model.findById(req.params.id)
    .exec()
    .then((data) =>
      res.status(200).json({ status: "succeeded", data: data.members, error: null })
      // ya que solo quiero los miembros he cambiado data por data.members
    )
    .catch((error) =>
      res
        .status(404)
        .json({ status: "failed", data: null, error: error.message })
    );
});

// GET /houses/settlements/:id devuelve los asentamientos de la casa con el id indicado
router.get("/settlements/:id", (req, res) => {
  Model.findById(req.params.id)
    .exec()
    .then((data) =>
      res.status(200).json({ status: "succeeded", data: data.settlements, error: null })
    )
    .catch((error) =>
      res
        .status(404)
        .json({ status: "failed", data: null, error: error.message })
    );
});

// GET /houses/allies/:id devuelve los aliados de la casa con el id indicado
router.get("/allies/:id", (req, res) => {
  Model.findById(req.params.id)
    .exec()
    .then((data) =>
      res.status(200).json({ status: "succeeded", data: data.allies, error: null })
    )
    .catch((error) =>
      res
        .status(404)
        .json({ status: "failed", data: null, error: error.message })
    );
});

// GET /houses/enemies/:id devuelve los aliados de la casa con el id indicado
router.get("/enemies/:id", (req, res) => {
  Model.findById(req.params.id)
    .exec()
    .then((data) =>
      res.status(200).json({ status: "succeeded", data: data.enemies, error: null })
    )
    .catch((error) =>
      res
        .status(404)
        .json({ status: "failed", data: null, error: error.message })
    );
});

module.exports = router;
