const fs= require('fs');// para el manejo de filesystem
const Usuario=require('../models/usuario');
const Medico=require('../models/medico');
const Hospital=require('../models/hospital');

const borrarImagen=(path)=>{
  // chequear que exista en el filesystem la ruta
    if (fs.existsSync(path)){
    // si existe la borro
    fs.unlinkSync(path);
}
}

const actualizarImagen=async(tipo, id, nombreArchivo)=>{
    let pathViejo='';

    switch (tipo) {
        case 'medicos':
            // buscamos el medico por el id
            const medico  = await Medico.findById(id);
            //existe el medico
            if (!medico){
                return false; // no se encontro el medico al que 
                // se le agregaria la imagen
            }

              // ver si ese medico tiene una imagen pre cargada   
             pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);

            // si no existe lo seteo en el medico
            medico.img=nombreArchivo;
            // grabamos el medico 
            await medico.save();
            // si anduvo todo ok
            return true;

            break;
            case 'usuarios':
                const usuario  = await Usuario.findById(id);
           
                if (!usuario){
                    return false; 
                }
    
                 
                 pathViejo = `./uploads/usuarios/${usuario.img}`;
                borrarImagen(pathViejo);
    
                usuario.img=nombreArchivo;
            
                await usuario.save();
                // si anduvo todo ok
                return true;
             break;
 
             case 'hospitales':
            const hospital  = await Hospital.findById(id);
           
            if (!hospital){
                return false; 
            }

             
             pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);

            hospital.img=nombreArchivo;
        
            await hospital.save();
            // si anduvo todo ok
            return true;
            break;
    
    
    }


 
}


module.exports={actualizarImagen}