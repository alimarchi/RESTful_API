const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 60,
    maxlength: 60,
    // 60 es la longitud de la contraseña cifrada con bcrypt
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    trim: true,
    default: "user",
  },
});

const login = mongoose.model("Login", loginSchema);

module.exports = login;
