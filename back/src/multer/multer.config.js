import multer from "multer";
import fs from "node:fs"

const upload = multer({dest: "uploads/"})

function savefile(file){
    const newpath = `./uploads/${file.originalname}`
    fs.renameSync(file.path, newpath)
}

export default savefile