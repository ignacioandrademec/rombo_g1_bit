import express from "express"
import conectarBD from "./configDB/configBD.js";
import "dotenv/config"
import morgan from "morgan"
import rutaInfo from "./rutas/ruta.info.js";

const server = express()
const puerto = process.env.PORT 

conectarBD()

server.use(morgan("dev"));
server.use(express.json());
server.use("/info", rutaInfo)



server.listen(puerto, ()=>{
    console.log(`servidor corriendo en puerto ${puerto}`);
})