// inicio de la aplicacion
// vamos a leer las variables de entorno definidas en .env
require('dotenv').config();

// importamos el express.js con node
const express = require('express');
const cors = require('cors');



/// pass mongo eAcVmhCNq6V1xjyn
//// usuario mongo vgreen
//mongodb+srv://vgreen:eAcVmhCNq6V1xjyn@cluster0.zvstw.mongodb.net/hospitaldb
// importo dbConnection con destructuracion
const {dbConnection}=require('./database/config.js');


//console.log(process.env); // aca trae todos la variables de entorno de node , a lo ultimo agrega Port del archivo.env

// crear un servidor de express
const app = express();

// configuro cors mediante un middleware el use
app.use(cors())

// llamamos la base de datos
 dbConnection();
 // lectura y parseo del body para las peticiones
app.use(express.json());

// Rutas
app.use('/api/usuarios',require('./routes/usuarios')); // la peticion a /api/usuarios sera respondida por lo que esta en require('./routes/usuarios'
app.use('/api/hospitales',require('./routes/hospitales.js')); // la peticion a /api/hospitales sera respondida por lo que esta en require('./routes/hospitales'
app.use('/api/login',require('./routes/auth')); // la peticion a /api/usuarios sera respondida por lo que esta en require('./routes/login'
app.use('/api/medicos',require('./routes/medicos')); // la peticion a /api/usuarios sera respondida por lo que esta en require('./routes/login'
app.use('/api/todo',require('./routes/busquedas')); 
app.use('/api/uploads',require('./routes/uploads')); 

/*
primer ejemplo  
app.get('/',(req,resp)=>{
    // cuando se indica slash / se ejecutara el callback que va como parametro
    // la respuesta se envia con el resp
    // normalmente en formato json
    resp.json(
        {
            ok:true,
            msg:'Hola Jose'
        }
    )
})
*/
// llamada a los usuarios
// lo vamos a sacar de aca porque se puede volver muy grande
// crearemos routes/
/*ESTO ES LA RUTA
app.get('/api/usuarios',(req,resp)=>{
    ESTO ES LO QUE DEVUELE EL CONTROLADOR
   .........
})


// Pruebas
app.get('/prueba',(req,resp)=>{
    // cuando se indica slash / se ejecutara el callback que va como parametro
    // la respuesta se envia con el resp
    // normalmente en formato json
    resp.json(
        {
            ok:true,
            msg:'Hola Mati'
        }
    )
})

*/


// levantamos el servidor
// parametros:
//              puerto, callback
// el puerto lo traemos de .env
app.listen(process.env.PORT,()=>{
    // que es lo que se va a ejecutar cuando se inicie
    console.log('Servidor corriendo en el puerto '+process.env.PORT);
    });
// luego cuando inicio el node con la sentencia 
// node index.js ya puedo hacer peticiones en el puerto DEFINIDO EN el file.env

