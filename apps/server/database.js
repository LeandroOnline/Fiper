const mongoose = require('mongoose');
require('dotenv/config');

async function connect(){
 try{
  await mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('Database conected')
}
catch(error) {
    console.error('Error al conectar a la base de datos:', error);
  };
}
connect();