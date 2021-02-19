const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 7000;
const host = '127.0.0.1';

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get('/clients-count', (req, res) => {
    res.json({ count: io.clients().server.enjine.clientsCount})
});

app.post('/client/:id', (req, res) => {
    if (clients.indexOf(req.params.id) !== -1 ) {
        io.sockets.connected[req.params.id].emit('private msg', `Message to client with id ${req.params.id}`)
        return res.status(200).json({ message: `Message was sent to client with id ${req.params.id}` })
    } else return res.status(400).json({ message: 'Client not found' });
});

let clients = [];
let clientsData = [];

io.on("connection", (socket) => {

  console.log(`Client with id ${socket.id} connected`);
  clients.push(socket.id);

  socket.on('msg', function(msg) {
    console.log(msg);
    let filtered = clientsData.filter((c) => {return c.id === socket.id});
    let client = filtered[0];

    if(!client) {
        client = {id: socket.id, messageCount: 1};
        clientsData.push(client);
    } else {
        client.messageCount++;
    };
    console.log("Got message from client " + socket.id + " messages: " + client.messageCount);
  });

  socket.emit("msg", "I'm server");

  setInterval(() => {
        socket.emit("msg", "Response from the server"); 
      } , 1500);

  socket.on("disconnect", () => {
    clients.splice(clients.indexOf(socket.id), 1);
    console.log(`Client with id ${socket.id} disconnected`);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});


http.listen(port, host, () => {
  console.log(`Socket.IO server running at http://${host}:${port}/`);
});
