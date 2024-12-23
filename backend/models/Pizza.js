import mongoose from "mongoose";


const PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
  },
  variants: {
    type: Map,
    of: Number,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});


const Pizza = mongoose.model('Pizza',PizzaSchema);

export default Pizza

