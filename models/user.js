// include mongoose because this is a mongoose model
const mongoose = require("mongoose")
const Schema = mongoose.Schema // A schema is a template for the model

const User = new Schema({
  username: String,
  password: String,
  friendCode: String,
  friendList: Array,
  team: Array, // current pokemon team
  bag: Array, // items the user has
  box: Array, // the pokemon not currently being used
  choseStarterPokemon: Boolean, // if the user has chosen their starter
  money: Number,
})

module.exports = mongoose.model("User", User) // the model is created and exported from the schematic
