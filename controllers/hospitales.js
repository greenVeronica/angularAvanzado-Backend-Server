// son simplemente funciones que son llamadas desde los routes
// cuando se leen las rutas a acceder.


const {response} = require('express'); // puede servir de ayuda al escribir las respuestas
const Hospital=require('../models/hospital');
const bcryptjs=require('bcryptjs');
const {generarJWT}=require('../helpers/jwt');



const getHospitales=async(req,resp=response)=>{

    const hospitales = await Hospital.find()
                                    .populate('usuario','nombre img');// traigo el usuario del 
                                    // hospital y los campos que quiero, ej nombre y email o img  
  

    resp.json(
        {
            ok:true,
            msg:'Lista de Hospitales',
            hospitales,
           // uid:req.uid
        }
    )
}

const crearHospital=async(req,resp=response)=>{

    const uid = req.uid; // este lo devolvio validarJWT
    // agrego el usuario
    const hospital = new Hospital(        
        {usuario:uid,...req.body});

    try {
      const hospitalDB =  await hospital.save();

        resp.json(
            {
                ok:true,
                hospital:hospitalDB
               // uid:req.uid
            }
        )


    } catch (error) {
        console.log(error);
        // retorno la respuesta
        resp.status(500).json({
            ok:false,
            msg:'error en creacion de hospital'
        })
    }
   
   
}

const actualizarHospital=async(req,resp=response)=>{

    resp.json(
        {
            ok:true,
            msg:'Actualizacio de Hospital',
            Hospital,
           // uid:req.uid
        }
    )
   
}

const borrarHospital=async(req,resp=response)=>{

    resp.json(
        {
            ok:true,
            msg:'borrado de Hospital',
            Hospital,
           // uid:req.uid
        }
    )
   
}



module.exports={
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}