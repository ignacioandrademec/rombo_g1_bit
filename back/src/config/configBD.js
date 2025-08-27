import mongoose from "mongoose"
import "dotenv/config"

const conectarBD = async ()=>{
    try {
        await mongoose.connect(process.env.MONGOURI)
        console.log("mongolBD conectado");
    } catch (error) {
        console.log("no funcion | error:", error);
    }
}

export default conectarBD