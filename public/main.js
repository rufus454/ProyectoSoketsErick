/*  creamos la variable que permitirá al frontend conectarse a nuestro backend*/

var socket = io.connect('http://localhost:3003', {'forceNew':true});

/* esto manda el mensaje de connect y aparece en el console.log */

/*El cliente manejará datos mediante mensajes, esto se llama ecentos y debem mostrarse en la consola de comandos*/
socket.on('messages',function(data){
    console.log(data);
    render(data);
}); 

/*creamos un template para que nos imprima el contenido del mensaje */

function render(data){
    //aqui se inicia el manejo del string que viene en EM6 se usan estas comillas ''
    //laS variables se colocan con el siglo de $ y entre {}

var html = data.map(function(elem, index){
    return(`<div> 
    <strong>${elem.autor}</strong>:
    <em>${elem.texto}</em>
</div>`);
}).join("");
                
document.getElementById('messages').innerHTML=html;

}

function addMessage(e){
    //cada vez que alguien presione el boton enviar en el formulario
    // el cliente emite un nuevo mensaje y manda un payload
    var payload = {
        autor: document.getElementById(username).value,
        texto: document.getElementById(texto).value
    };
    socket.emit('new-message' , payload);
    return false; 
}