import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  quant: Number,
  img: String,
})

//caso esse schema ja existir
const Product = models.Product || model("Product", ProductSchema)

export default {Product, ProductSchema}