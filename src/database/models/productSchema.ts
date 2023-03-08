import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
  quant: {type: Number, required: true},
  // img: String,
})

//caso esse schema ja existir
const Product = models.products || model("products", ProductSchema)

export default Product