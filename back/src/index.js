import express from "express";
import conectarBD from "./config/configBD.js";
import "dotenv/config";
import morgan from "morgan";
import rutaInfo from "./routers/ruta.info.js";
import routerUser from "./routers/routerUser.js";
// import routerAuth from "./routers/routerAuth.js"; // 👈 importar router de auth
import cors from "cors";

const server = express();
const puerto = process.env.PORT || 3000;

conectarBD();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

// Rutas
server.use("/info", rutaInfo);
server.use("/user", routerUser);
// server.use("/auth", routerAuth); // 👈 aquí montamos auth

server.listen(puerto, () => {
    console.log(`✅ Servidor corriendo en puerto ${puerto}`);
});
