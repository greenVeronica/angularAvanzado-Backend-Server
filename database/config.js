// conexion a mongo
const mongoose = require('mongoose');
// creamos una funcion la encargada de que cuando la llamamos
// se conecte a la base de mongo
const dbConnection = async ()=>{ // el asyn devuelve una promesa    
    // con el await indicamos que espera a que todo se cumpla
    // lo que esta dentro del await
    // para trabajar de manera sincrona
    // usamos un try-catch porque puede fallar la conexion a base de datos
    try {
        await mongoose.connect(process.env.DB_CNN,
        {useNewUrlParser: true, 
         useUnifiedTopology: true,
         useCreateIndex:true
        });
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion a la base de datos');
    }

}
// para poder usar dbConnection debo exportarla
module.exports ={
    dbConnection
}