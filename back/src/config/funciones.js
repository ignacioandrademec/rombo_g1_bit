import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "clave_super_segura"; 

export const generarToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};

export const verificarToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
        });
    });
};
