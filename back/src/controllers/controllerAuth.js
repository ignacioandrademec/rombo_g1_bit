import bcrypt from "bcryptjs";
import { generarToken, verificarToken } from "../config/funciones.js";
import modelUser from "../models/modelUser.js";

const controllerAuth = {
    iniciarSesion: async (sol, res) => {
        try {
            const { email, password } = sol.body;
            const userFound = await modelUser.findOne({ email });

            if (!userFound) {
                return res.json({ result: "mistake", message: "Usuario no encontrado" });
            }

            const passwordValida = await bcrypt.compare(password, userFound.password);
            if (!passwordValida) {
                return res.json({ result: "mistake", message: "Contraseña incorrecta" });
            }

            const token = await generarToken({
                id: userFound._id,
                name: userFound.name,
                email: userFound.email,
            });

            res.json({
                result: "fine",
                message: "Login exitoso",
                data: token,
            });
        } catch (error) {
            res.json({ result: "mistake", message: "Error en login", data: error.message });
        }
    },

    validarToken: async (sol, res) => {
        try {
            const token = sol.params.token;
            const decoded = await verificarToken(token);

            res.json({
                result: "fine",
                message: "Token válido",
                data: decoded,
            });
        } catch (error) {
            res.json({ result: "mistake", message: "Token inválido", data: error.message });
        }
    },
};

export default controllerAuth;
