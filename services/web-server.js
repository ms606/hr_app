const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server.js');
const router = require('./router.js');
const morgan = require('morgan');

let httpServer;

function initialize(){
    return new Promise((resolve, reject) => {
     const app = express();
     httpServer = http.createServer(app);
     
     app.use(morgan('Combined'));
     app.use('/api', router);


     httpServer.listen(webServerConfig.port)
      .on('listening', () => {
          console.log(`Web server listening on localhost: ${webServerConfig.port}`);

          resolve();
      })
      .on('error', err => {
          reject(err);
      });    

     });
     
 }



function close(){
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if (err){
                reject(err);
                return;
            }
            resolve();
        });
    });
}

module.exports.initialize = initialize;
module.exports.close = close;