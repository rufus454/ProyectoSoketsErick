var express = require('express');
var app = express();
var server = require ('http').Server(app);
var io= require ('socket.io')(server);

/* Aqui usamos un middleware para usar elementos estaticos en la sección publica de la aplicada */
app.use(express.static('public'));

app.get('/', function(req, res){
res.status(200).send("Hola Mundo");
});


/* De esta activamos el socket para que este escuche cuando mandamos un mensaje de control
por consola para saber que está pasando y tenemos que hacer que el mensaje venga del propio navegador web mediante html y JS */

io.on('connection', function(socket){
    console.log('Alguien se ha conectado al socket')
    /*aqui controlamos los eventos del cliente mediante sockets */
    socket.emit('messages',{
        id: 1,
        texto: "HolaT",
        autor: "Erick Eduardo Cerros Cabello"
    });
});

server.listen(3003, function(){
    console.log("El servidor esta corriendo en http://localhost:3003");
})