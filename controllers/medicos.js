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
    // obtenemos el id del hospital que se envio por la ruta
    const id = req.params.id;
    const uid = req.uid; // para saber el usuario que esta actualizando

    try {

        const MedicolDb= await Medico.findById(id);

        if(!MedicolDb){ // no existe el medico
         return   resp.status(404).json(
                {
                    ok:false,
                    msg:'No existe el medico',
                  
                }
            )
        }

        // hay que validar el hospital referenciado

        // actualizamos el medico
         const cambiosMedico = {
             ...req.body, // traigo todos los campos del body
            usuario:uid}; // agrego el usuario
        //  efectivamente ahora actualizamos el medico
        const medicoActualizado = await Medico.findByIdAndUpdate(id,cambiosMedico,{new:true });
        resp.json(
            {
                ok:true,
                medicoActualizado
                
               // uid:req.uid
            }
        )

    } catch (error) {
        resp.status(500).json({
            ok:false,
            msg:'error en actualizacion de medico'
        })
    }
 
   
}

const borrarMedico=async(req,resp=response)=>{
  const id = req.params.id;
  
  try {

       const MedicolDb= await Medico.findById(id);
    
      if(!MedicolDb){ // no existe el hospital
       return   resp.status(404).json(
              {
                  ok:false,
                  msg:'No existe el medico a borrar',
                
              }
          )
      }
       await Medico.findByIdAndDelete(id);
      resp.json(
          {
              ok:true,
              msg:'se borro el medico'
              
             // uid:req.uid
          }
      )

  } catch (error) {
      resp.status(500).json({
          ok:false,
          error,
          msg:'error en borrado de medico '
      })
  }
   
}


module.exports={
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}