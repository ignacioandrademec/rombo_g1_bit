import modelUser from "../models/modelUser.js";

const controllerUser = {
    crearUsuario: async(sol , res)=>{
        try{
            const {name, email, password} = sol.body;
            console.log(sol.body);
            
            const newUser = new modelUser({
                name,
                email,
                password,

            });
            console.log(newUser);

            const userCreate = await newUser.save();
            if(userCreate._id){
                res.json({
                    result: 'fine',
                    message: 'Usuario creado correctamente',
                    data: userCreate._id,
                });
            }
        }catch(error){
            res.json({
                result: 'mistake',
                message: 'Se ha producido un error creando el usuario',
                data: error,
            });
        }
    },
    leerUsuario: async(sol , res)=>{
        try{

            const userFound = await modelUser.findById(
                sol.params.id
            );
            if(userFound._id){
                res.json({
                    result: 'fine',
                    message: 'Usuario leido correctamente',
                    data: userFound,
                });
            }

        }catch(error){
            res.json({
                result: 'mistake',
                message: 'Se ha producido un error leyendo el usuario',
                data: error,
            });
        }
    }
    
}

export default controllerUser;