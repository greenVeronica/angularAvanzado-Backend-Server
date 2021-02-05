// son simplemente funciones que son llamadas desde los routes
// cuando se leen las rutas a acceder.


const {response} = require('express'); // puede servir de ayuda al escribir las respuestas
const Hospital=require('../models/hospital');
const bcryptjs=require('bcryptjs');
const {generarJWT}=require('../helpers/jwt');
const hospital = require('../models/hospital');



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
    // obtenemos el id del hospital que se envio por la ruta
    const id = req.params.id;
    const uid = req.uid; // para saber el usuario que esta actualizando

    try {

        const HospitalDb= await Hospital.findById(id);
        if(!HospitalDb){ // no existe el hospital
         return   resp.status(404).json(
                {
                    ok:false,
                    msg:'No existe el hospital',
                  
                }
            )
        }
        // actualizamos el hospital
         // hospitalDB.nombre = req.body.nombre; solo sirve si es un solo campos sino es engorroso
         const cambiosHospital = {
             ...req.body, // traigo todos los campos del body
            usuario:uid}; // agrego el usuario
        //  efectivamente ahora actualizamos el hospital
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambiosHospital,{new:true });
        resp.json(
            {
                ok:true,
                hospitalActualizado
                
               // uid:req.uid
            }
        )

    } catch (error) {
        resp.status(500).json({
            ok:false,
            msg:'error en actualizacion de hospital'
        })
    }
 
   
}

const borrarHospital=async(req,resp=response)=>{
  // obtenemos el id del hospital que se envio por la ruta
  const id = req.params.id;
  try {

      const HospitalDb= await Hospital.findById(id);
      if(!HospitalDb){ // no existe el hospital
       return   resp.status(404).json(
              {
                  ok:false,
                  msg:'No existe el hospital',
                
              }
          )
      }

      //  efectivamente ahora borramos el hospital
       await Hospital.findByIdAndDelete(id);
      resp.json(
          {
              ok:true,
              msg:'se borro el hospital'
              
             // uid:req.uid
          }
      )

  } catch (error) {
      resp.status(500).json({
          ok:false,
          msg:'error en borrado de hospital'
      })
  }
   
}



module.exports={
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}