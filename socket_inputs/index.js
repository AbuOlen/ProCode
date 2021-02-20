const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 7000;
const host = '127.0.0.1';

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/secondary", (req, res) => {
  res.sendFile(__dirname + "/index_server.html");
});

let clients = [];
let clientsData = [];
let secondary = {};

io.on("connection", (socket) => {

  console.log(`Client with id ${socket.id} connected`);
  clients.push(socket.id);

  socket.emit("msg", "I'm server");

  socket.on('secondary', function(msg) {
    secondary = socket;
  });

  socket.on('msg', function(msg) {
    console.log(msg);
    let client = clientsData.find((c) => {return c.id === socket.id});

    if(!client) {
        client = {id: socket.id, level: msg};
        clientsData.push(client);
    } else {
        client.level = msg;
    };
    secondary.emit('secondary', client);
    
    console.log("Got message from client " + socket.id + " level: " + client.level);
  });


  socket.on("disconnect", () => {
    clients.splice(clients.indexOf(socket.id), 1);
    let client = clientsData.find((c) => {return c.id === socket.id});
    clientsData.splice(clientsData.indexOf(client), 1);
    console.log(`Client with id ${socket.id} disconnected`);
  });

});


http.listen(port, host, () => {
  console.log(`Socket.IO server running at http://${host}:${port}/`);
});


