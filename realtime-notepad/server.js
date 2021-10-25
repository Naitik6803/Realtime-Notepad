const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const { log } = require("nodemon/lib/utils");
const { ExpressPeerServer } = require("peer");

const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use("/peerjs", peerServer);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  console.log("ready to use");
  socket.on("join-room", (roomId, userId) => {
    console.log("joined");
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
