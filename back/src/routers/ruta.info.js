import { Router } from "express";
import multer from "multer";
import controladorInfo from "../controllers/controlador.info.js";

const rutaInfo = Router()

const upload = multer({dest: "uploads/"})

/*-----------------------obtencion de archivo-------------------------*/

rutaInfo.post("/upload", upload.single("file") , controladorInfo.getAndHandleFile)

/*-----------------------manejo de rutas-------------------------*/

rutaInfo.get('/getInfo/:_id', controladorInfo.sendInfoAndDelete);

export default rutaInfo  