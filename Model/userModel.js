const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
    default: [],
    validate: [
      (array) =>
        array.length === 0 ||
        // para validar cada elemento del array, cada elemento del array es un objeto
        array.every((element) => {
          const keys = Object.keys(element);
          return (
            typeof element[keys[0]] === "boolean" &&
            typeof element[keys[1]] === "string"
          );
        }),
      "Wrong skills array",
    ],
  },
  personality: {
    type: Object,
    required: true,
    validate: [
      (obj) =>
        obj.constructor === Object &&
        Object.values(obj).every((element) => typeof element === "string"),
      "Wrong personality object",
    ],
  },
}, {
    versionKey: false,
});
// el modelo mongoose valida el schema
// se va a tener en cuenta cuando hago un POST
const User = mongoose.model("User", userSchema);
// aquí user tiene que estar en singular, en la bbdd será al plural users

module.exports = User;
