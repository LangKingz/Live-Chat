import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("chat message", (msg) => {
    try {
      console.log("message: " + msg);
      io.emit("chat message", msg);
    } catch (error) {
      console.log("error: " + error);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
