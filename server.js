import express from "express";
import http from "http";
import { Server } from "socket.io";
// diperlukan karena untuk menjalankan server dengan nextjs nya
import next from "next";

// inisialisasi nextjs server
const dev = process.env.NODE_ENV !== "production";
// inisialisasi app dengan nextjs agar bisa menggunakan next js di satu server
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("message", (msg) => {
      try {
        console.log("message", msg);
        io.emit("message", msg);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("error", (error) => {
      console.log(error);
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
