import express from "express"
import conectarBD from "./config/configBD.js";
import "dotenv/config"
import morgan from "morgan"
import rutaInfo from "./routers/ruta.info.js";
import routerUser from "./routers/routerUser.js";

const server = express()
const puerto = process.env.PORT 

conectarBD()

server.use(morgan("dev"));
server.use(express.json());
server.use("/info", rutaInfo)
server.use("/user", routerUser)


server.listen(puerto, ()=>{
    console.log(`servidor corriendo en puerto ${puerto}`);
})