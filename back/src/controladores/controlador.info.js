import modeloInfo from "../modelos/modelo.info.js";

const controladorInfo = {
    read: async (req, res)=>{
        try {
            res.status(200).json({
                data: "hola"
            })
        } catch (error) {
            req.status(500).json({
                data:error
            })
        }
    }
}

export default controladorInfo