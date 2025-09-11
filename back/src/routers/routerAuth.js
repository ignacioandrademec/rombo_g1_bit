import { Router } from "express";
import controllerAuth from "../controllers/controllerAuth.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const routerAuth = Router();

// login
routerAuth.post("/login", controllerAuth.iniciarSesion);

// validar token
routerAuth.get("/validar/:token", controllerAuth.validarToken);

// ejemplo de ruta protegida
routerAuth.get("/perfil", authMiddleware, (req, res) => {
    res.json({
        result: "fine",
        message: "Accediste al perfil con un token válido ✅",
        data: req.user,
    });
});

export default routerAuth;
