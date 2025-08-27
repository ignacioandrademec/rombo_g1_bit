import { Schema, model } from "mongoose";

const modeloInfo = new Schema({
    info:{
        type: String
    }
})

export default model("informacion", modeloInfo);