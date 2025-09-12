import modelUser from "../models/modelUser.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const controllerUser = {
    // Crear usuario con contraseña encriptada
    crearUsuario: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // encriptar contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new modelUser({
                name,
                email,
                password: hashedPassword,
            });

            const userCreate = await newUser.save();

            res.json({
                result: "fine",
                message: "Usuario creado correctamente",
                data: userCreate._id,
            });
        } catch (error) {
            res.json({
                result: "mistake",
                message: "Error creando usuario",
                data: error.message,
            });
        }
    },

    // Leer usuario por ID
    leerUsuario: async (req, res) => {
        try {
            const userFound = await modelUser.findById(req.params.id);

            if (!userFound) {
                return res.json({
                    result: "mistake",
                    message: "Usuario no encontrado",
                    data: null,
                });
            }

            res.json({
                result: "fine",
                message: "Usuario leído correctamente",
                data: userFound,
            });
        } catch (error) {
            res.json({
                result: "mistake",
                message: "Error leyendo usuario",
                data: error.message,
            });
        }
    },

    // Login de usuario
    loginUsuario: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Buscar usuario por email
            const userFound = await modelUser.findOne({ email });
            if (!userFound) {
                return res.json({
                    result: "mistake",
                    message: "Usuario no encontrado",
                    data: null,
                });
            }

            // Validar contraseña
            const passwordValid = await bcrypt.compare(password, userFound.password);
            if (!passwordValid) {
                return res.json({
                    result: "mistake",
                    message: "Contraseña incorrecta",
                    data: null,
                });
            }

            // Generar token JWT
            const token = jwt.sign(
                { id: userFound._id, name: userFound.name, email: userFound.email },
                process.env.JWT_SECRET || "secretkey",
                { expiresIn: "1h" }
            );

            res.json({
                result: "fine",
                message: "Login exitoso",
                data: { token },
            });
        } catch (error) {
            res.json({
                result: "mistake",
                message: "Error en el login",
                data: error.message,
            });
        }
    },
};

export default controllerUser;
