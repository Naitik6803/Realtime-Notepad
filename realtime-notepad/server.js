const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const { log } = require("nodemon/lib/utils");
const { ExpressPeerServer } = require("peer");
const path = require("path");

const customGenerationFunction = () =>
  (Math.random().toString(36) + "0000000000000000000").substr(2, 16);

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/",
  generateClientId: customGenerationFunction,
});

app.use(express.static(path.join(__dirname, "frontend/build")));

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

io.on("connection", (socket) => {
  console.log("ready to use");
  socket.on("join-room", (roomId, userId) => {
    console.log("joined room", roomId, "-", userId);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    });
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
