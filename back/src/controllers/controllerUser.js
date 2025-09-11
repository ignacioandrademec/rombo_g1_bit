import modelUser from "../models/modelUser.js";
import bcrypt from "bcryptjs";

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
};

export default controllerUser;
