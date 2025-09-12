import { Router } from "express";
import controllerUser from "../controllers/controllerUser.js"; // ✅ solo una importación
import controllerAuth from "../controllers/controllerAuth.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const routerUser = Router();

// Crear usuario
routerUser.post("/", controllerUser.crearUsuario);

// Leer usuario por id
routerUser.get("/:id", controllerUser.leerUsuario);

// Iniciar Sesión
// routerUser.post("/login", controllerUser.loginUsuario);

// login
routerUser.post("/login", controllerAuth.iniciarSesion);

// validar token
routerUser.get("/validar/:token", controllerAuth.validarToken);

// ejemplo de ruta protegida
routerUser.get("/perfil", authMiddleware, (req, res) => {
    res.json({
        result: "fine",
        message: "Accediste al perfil con un token válido ✅",
        data: req.user,
    });
});

export default routerUser;
