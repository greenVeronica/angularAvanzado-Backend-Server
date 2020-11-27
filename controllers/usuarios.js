const {response} = require('express'); // puede servir de ayuda al escribir las respuestas
const Usuario=require('../models/usuario');
const bcryptjs=require('bcryptjs');
const {generarJWT}=require('../helpers/jwt');

//const { delete } = require('../routes/usuarios');
//const usuario = require('../models/usuario');


/*aca va el callback de la peticion en routes
tendra todas las funciones y callback
que responden a las peticiones*/

const getUsuarios=async(req,resp)=>{
    // voy a buscar la lista de usuarios en la base
    // agregamos await, es necesario esperar que responda
   //  const usuario = await Usuario.find();  // trae todos los campos
    const usuario = await Usuario.find({},'nombre email role google');  
    // traigo solo nombre, email.....

    // en el validar-jwt agregamos que al validar el token agregue l req el uid
    // lo verificamos y lo mandamos en el resp
     


    resp.json(
        {
            ok:true,
            msg:'Lista de usuarios',
            usuario,
            uid:req.uid
        }
    )
}

// leemos del body, viene en el req, si viene resp vacio debe ser tipo response
// basicamente la respueta viene de la base, pero cuando vuelve error,lo maneja el catch
const crearUsuario=async(req,resp=response)=>{
  //  console.log(req.body);

    // obtenemos los datos del body usando destructuracion
    // que necesito controlar
    const {email,  password}=req.body;
  
    try{

        const existeMail= await Usuario.findOne({email});// seria findOne({email:email del body})
        if (existeMail){
            // si ya existe salgo sin grabar
          return   resp.status(400).json({
                ok:false,
                msg:'el email ya existe'    
            })
        }
    // los datos del body son para crear un usuario
    // le aplico el modelo de usuario para guardar 
    // el usuario en la base
    // creamos una instancia del modelo de usuario
    const usuario = new Usuario(req.body);
    // antes de grabar, encriptamos la clave
        const salt= bcryptjs.genSaltSync();//nro aleatorio para enganchar con la clave
        usuario.password=bcryptjs.hashSync(password,salt);

    // lo grabamos en en mongo con save que devuelve una promesa
    // necesito que termine para seguir
        await usuario.save()
    //  generar token - JWT
      const token =await generarJWT(usuario.id);  
    resp.json(
        {
            ok:true,
            usuario,
            token
        }
    )

    }
    catch(error){
        console.log(error);
        // retorno la respuesta
        resp.status(500).json({
            ok:false,
            msg:'error en credenciales'
        })
    }
    
}

// actualizar usuario
const actualizarUsuario=async(req,resp=response)=>{
    const uid =  req.params.id;
    try {

        const usuarioDB=await Usuario.findById(uid);
        //si no existe
        if(!usuarioDB){
          return  resp.status(404).json({
                ok:false,
                msg:'no existe el usuario'
            })
        }
      //   const campos = req.body; otra opcion con destructuracion
      const { password, google,email, ...campos} =req.body; // pass y google van aparte y el resto en campos.
        // extraemos los campos a actualizar
        if (usuarioDB.email !== email){ // si no lo esta cambiando no lo mando a actualzar

       
            // voy a buscar el email que el usuario escribio en la base
            // y lo devuelvo en email
            const existeEmail = await Usuario.findOne({email });
            if (existeEmail){
                return resp.status(400).json({
                    ok:false,
                    msg:'no se puede actualizar el email, ya existe'
                })
            }
        }
       
        // si no existe el email , lo agrego a campos
        campos.email = email;
        // si vinieron campos que no quiero actualizar 
        // esta demas , se mejoro con la destructuracion const { password, google, ...campos} =req.body;
        /*
        delete campos.pasword;
        delete campos.google;
        */

        // lo  busco y actualizo
        const usuarioActualizado =await Usuario.findByIdAndUpdate(uid,campos,{new:true});
        // el new en true es para que devuelva el usuario actualizado

        resp.json(
            {
                ok:true,
                usuario : usuarioActualizado
            }
        )
    } catch (error) {
        console.log(error);
        // retorno la respuesta
        resp.status(500).json({
            ok:false,
            msg:'error en actualizacion'
        })
    }
}

const borrarUsuarios = async(req,resp=response)=>{
    const uid =  req.params.id;
    try {

        const usuarioDB=await Usuario.findById(uid);
        //si no existe
        if(!usuarioDB){
          return  resp.status(404).json({
                ok:false,
                msg:'no existe el usuario a borrar'
            })
        
        }
        await Usuario.findOneAndDelete(uid)

        resp.json(
            {
                ok:true,
                usuario : 'usuario eliminado'
            }
        )


    }

catch (error) {
        console.log(error);
        // retorno la respuesta
        resp.status(500).json({
            ok:false,
            msg:'error en el borrado'
        })
    }
}
module.exports={
    getUsuarios,
    crearUsuario,
    actualizarUsuario,borrarUsuarios
}