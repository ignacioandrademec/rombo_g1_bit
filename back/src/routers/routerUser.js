import { Router } from "express";
import controladorUser from "../controllers/controllerUrser.js";

const routerUser = Router();

routerUser.post("/", controladorUser.crearUsuario);

routerUser.get("/:id", controladorUser.leerUsuario);

export default routerUser;