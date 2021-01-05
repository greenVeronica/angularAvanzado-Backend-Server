const path= require('path'); // lo tienen NODE para poder construir un path completo
const fs= require('fs');// para el manejo de filesystem

const {response} = require('express'); // puede servir de ayuda al escribir las respuestas
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizarFoto');

const fileUpload=async(req,resp=response)=>{
    const tipo= req.params.tipo;
    const id= req.params.id;   
    const tiposValidos=['hospitales','medicos','usuarios'] ;

    // validar tipo 
    if(!tiposValidos.includes(tipo)){
       return resp.status(500).json({
            ok:false,
            msg:'error en el tipo de archivo '
        })
    }
    
    // validar que exista el archivo 
    if (!req.files || Object.keys(req.files).length === 0) {
        return resp.status(500).json({
            ok:false,
            msg:'no se selecciono ningun archivo '
        })
      }
    
    // procesar la imagen
    const imagen= req.files.imagen;// es el nombre del parametro que llego por parametro
    // el  req.files funciona por haber configurado el midleware router.use(expressFileUpload());
   // console.log(imagen);

    const nombreCortado = imagen.name.split('.');
    const extension=nombreCortado[nombreCortado.length-1];
    // validar extension
    const extensionesValidas=['jpg','png','jpeg','gif','PNG'];

    if(!extensionesValidas.includes(extension)){
        return resp.status(500).json({
             ok:false,
             msg:'error en el tipo de extension '
         })
     }

    // cambiaremos el nombre cuando lo grabamos, para evitar duplicados 
    // usaremos la libreria uuid para generar un id unico
    const nombreArchivo = `${uuidv4()}.${extension}`;

    // path para guardar la imagen
    const path=`./uploads/${tipo}/${nombreArchivo}`;
     // mover la imagen al path

     imagen.mv(path, (err)=> {
        if (err){
            console.log(err);
        return resp.status(500).json({
            ok:false,
            msg:'error al subir archivo  '
        })
        }
      //  res.send('File uploaded!');

      // actualizar la base de datos
      // creamos un helper o una funcion externa para no extender 
      // mas este codigo 
      
      actualizarImagen(tipo, id, nombreArchivo);  
      
      resp.json(
        {   
            ok:true,
            msg:'OK subir por archivos',
            path
           // uid:req.uid
        });


      });
    


    

}
const leerFoto=async(req,resp=response)=>{

    const tipo= req.params.tipo;
    const foto= req.params.foto;   

    // usamos el path importado de Node

    // __dirname : es donde esta desplegada la aplicacion
    const pathFoto= path.join (__dirname,`../uploads/${tipo}/${foto}`);
    // si la imagen / path no existe manejamos una excepcion o imagen por default
    const fotoDefault =  path.join (__dirname,`../uploads/no-img.jpg`);
    if (fs.existsSync(pathFoto)){
     //   console.log('existe');
        resp.sendFile(pathFoto);
    }else{
    resp.sendFile(fotoDefault);
    }
    // para que express responda la imagen en lugar de un json va:
  //  resp.sendFile(pathFoto);
  //resp.sendFile(fotoDefault);

    /*resp.json(
        {   
            ok:true,
            msg:'OK leer foto',
            tipo,foto

        });*/

}
module.exports={
    fileUpload,leerFoto

}