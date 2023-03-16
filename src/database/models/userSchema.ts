import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  email: {type: String, required: true},
  pass: {type: String, required: false},
  cart: {type: Array, required: false}
})

//caso esse schema ja existir
const User = models.User || model("User", UserSchema)

export default User