import { Router } from "express";
import controladorInfo from "../controllers/controlador.info.js";

const rutaInfo = Router()

rutaInfo.get("/", controladorInfo.read)

export default rutaInfo