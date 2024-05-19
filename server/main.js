var express = require('express');
var app = express();
var server = require ('http').Server(app);
var io= require ('socket.io')(server);

// array que guarda los mensajes
var message = [{
    id: 1,
    texto: "Hola soy un mensaje",
    autor: "Erick Eduardo Cerros Cabello"
}];
/* Aqui usamos un middleware para usar elementos estaticos en la sección publica de la aplicada */
app.use(express.static('public'));




/* De esta activamos el socket para que este escuche cuando mandamos un mensaje de control
por consola para saber que está pasando y tenemos que hacer que el mensaje venga del propio navegador web mediante html y JS */

io.on('connection', function(socket){
    console.log('Alguien se ha conectado al socket')

    /*aqui controlamos los eventos del cliente mediante sockets */
    socket.emit('messages',message);
    
    socket.on('new-message', function(data){
         //para poder guardar estos mensajes lo ideal seria en una base de datos
         // para este ejercicio utlizaremos arrays (esto es bueno para produccion)
         message.push(data);

         io.sockets.emit(`messages`, message);
    });

});

server.listen(3003, function(){
    console.log("El servidor esta corriendo en http://localhost:3003");
})