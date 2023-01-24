const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    words: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sigil: {
      type: String,
      required: true,
    },
    leader: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    settlements: {
      type: Array,
      required: true,
      default: [],
      validate: [
        (array) =>
          array.length === 0 ||
          array.every((element) => typeof element === "string"),
      ],
    },
    religion: {
      type: String,
      required: true,
    },
    allies: {
      type: Array,
      required: true,
      default: [],
      validate: [
        (array) =>
          array.length === 0 ||
          array.every((element) => typeof element === "string"),
      ],
    },
    enemies: {
      type: Array,
      required: true,
      default: [],
      validate: [
        (array) =>
          array.length === 0 ||
          array.every((element) => typeof element === "string"),
      ],
    },
    members: {
        type: Array,
        required: true, 
        default: [],
        validate: [
            (array) => array.length === 0 || array.every((element) => {
                const keys = Object.keys(element);
                return (
                    typeof element[keys[0]] === "string" &&
                    typeof element[keys[1]] === "number"
                )
            })
        ]
    }
  },
  {
    versionKey: false,
  }
);

const House = mongoose.model("House", userSchema);
module.exports = House;
