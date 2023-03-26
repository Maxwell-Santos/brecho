import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  email: {type: String},
  pass: {type: String},
  cart: {type: Array},
  favorites: {type: Array}
})

//caso esse schema ja existir
const User = models.User || model("User", UserSchema)

export default User