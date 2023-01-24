const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Model = require("../Model/loginModel");
const { generateToken, verifyToken } = require("../lib/utils");

router.post("/signup", async (req, res) => {
  try {
    const data = new Model({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
    });
    data
      .save()
      .then((data) =>
        res.status(201).json({
          status: "succeeded",
          data,
          error: null,
        })
      )
      .catch((error) => {
        // console.log(Object.keys(error));
        // console.log(error.code);
        if (error.code == 11000) {
          console.log("Clave duplicada");
          return res.status(409).json({
            status: "failed",
            data: null,
            error:
              "You are trying to register an existent email. Please choose a new email and try again.",
          });
        }
        return res
          .status(400)
          .json({ status: "failed", data: null, error: error.message });
      });
  } catch (error) {
    if (error.message == "data and salt arguments required") {
      res.status(422).json({
        status: "failed",
        data: null,
        error:
          "Password is required, please insert a valid password and try again",
      });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = await Model.findOne({ email: req.body.email }).exec();
    if (data) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        data.password
      );
      if (validPassword) {
        // generar un token
        const user = {
          email: data.email,
          role: data.role,
        };
        const token = generateToken(user, false);
        const refreshToken = generateToken(user, true);
        res.status(200).json({
          status: "succeeded",
          data: {
            id: data._id,
            email: data.email,
            role: data.role,
            token,
            refreshToken,
          },
          error: null,
        });
      } else {
        res.status(401).json({
          status: "failed",
          data: null,
          error: "Wrong email or password",
        });
      }
    } else {
      res.status(401).json({
        status: "failed",
        data: null,
        error: "Wrong email or password",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
});

router.get("/refresh", verifyToken, (req, res, next) => {
  // verifyToken es el middleware
  if (!req.user) {
    return res.status(400).send("Access denied");
  }
  const { email, role, exp } = req.user;
  res.status(200).json({
    status: "Succedeed",
    data: {
      token: generateToken({ email, role }, false),
      refreshToken: generateToken({ email, role }, true),
    },
    error: null,
  });
});

module.exports = router;
