const app               = require('./app.js');
const http              = require('http');
                          require('dotenv').config();
const PORT              = process.env.PORT || 3000;

let server = http.createServer(app);

server.listen(PORT,()=>{
  console.log(`SERVER LISTENING ON PORT ${PORT}`);
}); 