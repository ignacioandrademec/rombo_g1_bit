import { Schema, model } from "mongoose";

const modeloInfo = new Schema({},{strict:false})

export default model("informacion", modeloInfo);