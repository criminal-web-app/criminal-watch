const http        = require('http');
const express     = require('express');
const bodyParser  = require('body-parser');

const app         = express();
                    require('dotenv').config();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(()=>{

});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Authorization');
  next();
});

app.use('/', (req,res)=>{
  return res.json({
    message : 'Route not found',
    context : 'Route does not exists'
  }).status(404);
});

module.exports = app;