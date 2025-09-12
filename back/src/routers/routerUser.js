import { Router } from "express";
import controllerUser from "../controllers/controllerUser.js"; // ✅ solo una importación

const routerUser = Router();

// Crear usuario
routerUser.post("/", controllerUser.crearUsuario);

// Leer usuario por id
routerUser.get("/:id", controllerUser.leerUsuario);

export default routerUser;
