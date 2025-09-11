import { verificarToken } from "../config/funciones.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer <token>"

        if (!token) {
            return res.status(401).json({ result: "mistake", message: "Token requerido" });
        }

        const decoded = await verificarToken(token);
        req.user = decoded; // guardamos info del usuario en la request
        next();
    } catch (error) {
        res.status(401).json({ result: "mistake", message: "Token inválido", data: error.message });
    }
};
