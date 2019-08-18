
const http = require('http');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO.listen(server);


app.use(express.static(__dirname + '/public'));




server.listen(3000, function () {
    console.log('server funcionando en el puerto 3000');
});


const Serialport = require('serialport');
const ReadLine = Serialport.parsers.Readline;

const port = new Serialport('COM3', {
    baudRate: 9600
});

const parser = port.pipe(new ReadLine({ delimeter: '\r\n' }));

parser.on('open', function () {
    console.log('Conexión establecida');
});

parser.on('data', function (data) {
    let temp = parseInt(data, 10) + ' ºC';
    console.log(temp);
    io.emit('temp', data);
});

port.on('error', function (err) {
    console.log(err);
});