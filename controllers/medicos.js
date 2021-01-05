// son simplemente funciones que son llamadas desde los routes
// cuando se leen las rutas a acceder.


const {response} = require('express'); // puede servir de ayuda al escribir las respuestas
const Medico=require('../models/medico');
const bcryptjs=require('bcryptjs');
const {generarJWT}=require('../helpers/jwt');



const getMedicos=async(req,resp=response)=>{

    const medicos = await Medico.find()
                                .populate('usuario','nombre img')// traigo el usuario del 
                                .populate('hospital','nombre ');    // hospital y los campos que quiero, ej nombre y email o img  
  

    resp.json(
        {
            ok:true,
            msg:'Lista de Medicos',
            medicos,
           // uid:req.uid
        }
    )
}

const crearMedico=async(req,resp=response)=>{

   
    const uid = req.uid; // este lo devolvio validarJWT
   // console.log('usuario es ', uid  );

  //  const { nombre, hospital, ...campos} =req.body
    // agrego el usuario
    const medico = new Medico(        
        {usuario:uid,...req.body});

    try {
      const medicoDB =  await medico.save();

        resp.json(
            {
                ok:true,
                medico:medicoDB
               // uid:req.uid
            }
        )


    } catch (error) {
        console.log(error);
        // retorno la respuesta
        resp.status(500).json({
            ok:false,
            msg:'error en creacion del medico'
        })
    }
   
   
}

const actualizarMedico=async(req,resp=response)=>{

    resp.json(
        {
            ok:true,
            msg:'Actualizacion de Medico',
            Medico,
           // uid:req.uid
        }
    )
   
}

const borrarMedico=async(req,resp=response)=>{

    resp.json(
        {
            ok:true,
            msg:'borrado de Medico',
            Medico,
           // uid:req.uid
        }
    )
   
}



module.exports={
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}