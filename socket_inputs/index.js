const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 7000;
const host = "127.0.0.1";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/secondary", (req, res) => {
  res.sendFile(__dirname + "/index_server.html");
});

let clients = [];
let clientsData = [];

const panel = io.of("/panel"); //create namespace for dashboard(server)

io.on("connection", (socket) => {
  console.log(`Client with id ${socket.id} connected`);

  clients.push(socket.id);

  socket.on("msg", function (msg) {
    console.log(msg);
    let client = clientsData.find((c) => {
      return c.id === socket.id;
    });

    if (!client) {
      //if new client
      client = { id: socket.id, level: msg, connected: true };
      clientsData.push(client);
    } else {
      client.level = msg;
      connectInfo = client.connected;
    }
    panel.emit("msg", client);

    console.log(
      "Got message from client " + socket.id + " level: " + client.level
    );
  });

  socket.on("disconnect", () => {
    clients.splice(clients.indexOf(socket.id), 1);
    let client = clientsData.find((c) => {
      return c.id === socket.id;
    });
    if (client) {
      clientsData.splice(clientsData.indexOf(client), 1);
      client.connected = false;
      console.log(`Client with id ${socket.id} disconnected`);
      panel.emit("msg", client);
    }
  });
});

//notify dashboard about new clients connected
io.of("/").adapter.on("join-room", (room, id) => {
  let client = clientsData.find((c) => {
    return c.id === id;
  });
  if (!client) {
    client = { id: id, level: 0, connected: true };
    clientsData.push(client);
  } else {
    client.level = 0;
  }
  panel.emit("msg", client);
});

http.listen(port, host, () => {
  console.log(`Socket.IO server running at http://${host}:${port}/`);
});
