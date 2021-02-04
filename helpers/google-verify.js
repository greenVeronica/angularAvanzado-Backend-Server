// para validar el token de google y no recargar los controladores
// copiado de google-developers
// https://developers.google.com/identity/sign-in/web/backend-auth
// CLIENT_ID es el google id esta en process.env.GOOGLE_ID
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID);

const  googleVerify =    async(token)=>{
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];

  //  console.log(payload); // aca viene toda la info de google cuando lo verifico ok
  const {name, email , picture} = payload;
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  return  {name, email , picture};
}
// verify().catch(console.error); no lo usamos


module.exports={
    googleVerify
}