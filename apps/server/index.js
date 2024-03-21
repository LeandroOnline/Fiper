const dotenv = require('dotenv').config();
require('./database');
const app= require('./app');

app.listen(process.env.PORT, ()=>console.log('Server running'));