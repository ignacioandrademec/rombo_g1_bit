import modeloInfo from "../models/modelo.info.js";
import savefile from "../multer/multer.config.js"
import fs from "node:fs"
import path from "node:path";

const controladorInfo = {
    getAndHandleFile: async (req, res)=>{
        try {
            if(!req.file){
                res.status(400).json({
                    data:"no se pudo recibir el archivo"
                })
            } else {
                console.log(req.file);
                savefile(req.file)
                const filePath = path.join('uploads', req.file.originalname);
                fs.access(filePath, fs.constants.F_OK, (err) => {
                    if (err) {
                        return res.status(404).json({ error: 'Archivo no encontrado' });
                    }
                    let jsonData;
                    fs.readFile(filePath, 'utf8', (readErr, data) =>{
                        if (readErr) {
                            return res.status(500).json({ error: 'Error al leer el archivo' });
                        }
                        try {
                            jsonData = JSON.parse(data);
                        } catch (parseErr) {
                            return res.status(400).json({ error: 'Archivo JSON inválido' });
                        }
                        fs.unlink(filePath, (deleteErr) => {
                            if (deleteErr) {
                                return res.status(500).json({ error: 'Error al borrar el archivo' });
                            }
                        })
                        
                        const infoSave = new modeloInfo(jsonData)
                        infoSave.save()
                        res.status(200).json({
                            datosFinancieros:infoSave
                        })
                    })
                })
            }
        } catch (error) {
            res.status(500).json({
                data:error
            })
        }
    },
    sendInfoAndDelete: async(req, res)=>{
        try {
            const {_id} = req.params
            const getInfo = await modeloInfo.findById(_id)
            await modeloInfo.findByIdAndDelete(_id)
            res.status(200).json({
                data:getInfo
            })
        } catch (error) {
            res.status(500).json({
                data:error
            })
        }
    }
}

export default controladorInfo