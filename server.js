// Get Dependencies
const app= require('./app');
const dotenv = require('dotenv');
const config = require('./config/index').config;
const dbConnection = require('./config/database.config');
const http = require('http');
// const sockets = require('./sockets');
const { Server:WebSocketServer } = require('socket.io')

dbConnection.connect();
dotenv.config();

const port = config.PORT || 5000;

const server  = http.createServer(app);
const httpServer = server.listen(port, () => console.log(`Server running on port ${port}`));
const io = new WebSocketServer(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000','http://127.0.0.1:62338' ]
  } 
});
// sockets(io);