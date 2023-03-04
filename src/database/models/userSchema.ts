import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {type: String, required: true},
  pass: {type: String, required: true},
})

//caso esse schema ja existir
const User = models.User || model("User", UserSchema)

export default User