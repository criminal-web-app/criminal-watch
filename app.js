const http        = require('http');
const express     = require('express');
const bodyParser  = require('body-parser');

const app         = express();
                    require('dotenv').config();

const PORT          = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(()=>{

});

app.use('/', (req,res)=>{
  return res.json({
    message : 'Route not found',
    context : 'Route does not exists'
  }).status(404);
});

app.listen(PORT,()=>{
  console.log(`Server running in port ${PORT}`);
});