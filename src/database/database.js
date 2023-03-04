import mongoose from "mongoose";

mongoose.set("strictQuery", true)

const dbName = 'Brecho'
const url = `mongodb+srv://maxcoding011:${process.env.DB_PASS}@brecho.ufkyd49.mongodb.net/${dbName}?retryWrites=true&w=majority`

const connect = async () => {
  return await mongoose.connect(url)
}

const disconnect = async () => {
  return await mongoose.disconnect()
}

const database = {connect, disconnect}

export default database