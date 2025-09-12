import modeloInfo from "../models/modelo.info.js";
import savefile from "../multer/multer.config.js"
import fs from "node:fs"
import path from "node:path";
import csv from "csvtojson"

const controladorInfo = {
    getAndHandleFile: async (req, res)=>{
        try {
            if(!req.file){
                res.status(400).json({
                    data:"no se pudo recibir el archivo"
                });
            };
            if (req.file.mimetype == "text/csv") {
                try {
                    const filePath = path.join('uploads', req.file.filename);
                    const jsonArray = await csv().fromFile(filePath);

                    const resultado = {};

                    jsonArray.forEach((item)=>{
                        const mes = item.mes.toLowerCase(); // "enero"
                        const ingresos = Number(item.ingresos);
                        const gastos = Number(item.gastos);

                        resultado[mes] = { ingresos, gastos };
                    });

                    const infosave = new modeloInfo(resultado);
                    infosave.save()
                    fs.unlinkSync(filePath);
                    res.status(200).json({ 
                        message: 'Archivo CSV importado correctamente.', 
                        datosFinancieros: infosave
                    });
                } catch (error) {
                    res.status(500).json({ 
                        message: 'error al importar CSV.', 
                        data: error.message });
                }
            } else {
                console.log(req.file);
                savefile(req.file)
                const filePath = path.join('uploads', req.file.originalname);
                fs.access(filePath, fs.constants.F_OK, (err) => {
                    if (err) {
                        return res.status(404).json({ error: 'Archivo no encontrado' });
                    }
                    let fileData;
                    fs.readFile(filePath, 'utf8', (readErr, data) =>{
                        if (readErr) {
                            return res.status(500).json({ error: 'Error al leer el archivo' });
                        }
                        try {
                            fileData = JSON.parse(data);
                            const infoSave = new modeloInfo(fileData)
                            infoSave.save()
                            res.status(200).json({
                                mensage: "se registro el archivo .json",
                                datosFinancieros: infoSave
                            })
                        } catch (parseErr) {
                            return res.status(400).json({ error: 'Archivo JSON inválido' });
                        }
                        fs.unlink(filePath, (deleteErr) => {
                            if (deleteErr) {
                                return res.status(500).json({ error: 'Error al borrar el archivo' });
                            }
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