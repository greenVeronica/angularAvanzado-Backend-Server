// son simplemente funciones que son llamadas desde los routes
// cuando se leen las rutas a acceder.


const {response} = require('express'); // puede servir de ayuda al escribir las respuestas

const Usuario=require('../models/usuario');
const Medico=require('../models/medico');
const Hospital=require('../models/hospital');




const getTodo=async(req,resp=response)=>{


    const busquedas =req.params.busqueda; 
    const regExp = new RegExp(busquedas,'i'); //  'i' esto indica que no es casesensitive
   // const usuarios = await Usuario.find({nombre:regExp});
   // const medicos  = await Medico.find({nombre:regExp});
   // const hospitales  = await Hospital.find({nombre:regExp});




    const [usuarios, medicos,hospitales] =  await Promise.all([ // cada promesa se ejecuta simultaneamente
        // primer promesa
        Usuario.find({nombre:regExp}),
        // segunda promesa  
        Medico.find({nombre:regExp}),   
        Hospital.find({nombre:regExp})  
    ]);

    resp.json(
        {
            ok:true,
            msg:'OK',
            usuarios, medicos,hospitales
           // uid:req.uid
        }
    )
}


//getDocumentosColeccion

const getDocumentosColeccion=async(req,resp=response)=>{


    const tabla =req.params.tabla; 
    const busquedas =req.params.busqueda; 

    const regExp = new RegExp(busquedas,'i'); //  'i' esto indica que no es casesensitive
   // const usuarios = await Usuario.find({nombre:regExp});
   // const medicos  = await Medico.find({nombre:regExp});
   // const hospitales  = await Hospital.find({nombre:regExp});

   let data=[];

   switch (tabla) {
       case 'medicos':
           data  = await Medico.find({nombre:regExp})
                                .populate('usuario','nombre img')// traigo el usuario del 
                                .populate('hospital','nombre ');
          
           break;
           case 'usuarios':
             data = await Usuario.find({nombre:regExp});
         
            break;

            case 'hospitales':
                 data  = await Hospital.find({nombre:regExp})
                                        .populate('usuario','nombre img');
              
                break;
   
       default: 
         return  resp.status(400).json( {
            ok:false,
            msg:'no se encontro la coleccion',
               });


   
   }

   resp.json( {
    ok:true,
    msg:'OK',
    resultado:data
            } )

}




module.exports={
    getTodo,
    getDocumentosColeccion

}