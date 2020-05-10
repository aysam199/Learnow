const app = require('./app/app');
const port = process.env.PORT || 5000;

const http = require("http").createServer(app);
const io = require("socket.io")(http);
const connectedUsers = []

http.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

io.on("connection", socket => {
  var userName = "";
  socket.on("user connected", newUser => {
    userName = newUser;
    connectedUsers.push(userName);
    io.emit("update connected users", connectedUsers);

    socket.on("chat message", function(msg) {
      io.emit("chat message",msg);
    });
  });

  socket.on("disconnect", () => {
    const userIndex = connectedUsers.indexOf(userName);
    connectedUsers.splice(userIndex, 1);
    io.emit("update connected users", connectedUsers);
  });
});
