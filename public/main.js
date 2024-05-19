/*  creamos la variable que permitirá al frontend conectarse a nuestro backend*/

var socket = io.connect('http://localhost:3003', {'forceNew':true});


socket.on('messages', function(data){
    console.log(data);
    render(data);
});

// creamos un templete para que nos imprima el contenido

function render(data){
    //restructuramos esta seccion para que se maneje el array
    //elem se un conjunto de cosas
    //con map recorremos el array
    
    var html = data.map(function(elem,index){
       return ( `<div>
        <strong>${elem.autor}</strong>:
        <em>${elem.texto}</em> 
        </div>`);
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}

//cada ves que alguien precione el boton enviar en el formulario
//el cliente emite un nuevo mensaje y manda el payload
function addMessage(e){
    var payload = {
        autor: document.getElementById('username').value,
        texto: document.getElementById('texto').value

    };
    socket.emit('new-message',payload);
    return false;
}