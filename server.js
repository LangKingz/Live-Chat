import express from "express";
import http from "http";
import { Server } from "socket.io";
// diperlukan karena untuk menjalankan server dengan nextjs nya
import next from "next";

// inisialisasi nextjs server

/**
 * `dev` adalah sebuah variabel yang digunakan untuk menentukan apakah aplikasi sedang berjalan di lingkungan pengembangan atau lingkungan produksi.
 * 
 * `process.env.NODE_ENV` adalah variabel yang disediakan oleh Node.js dan digunakan untuk menentukan lingkungan aplikasi. Secara default, nilainya selalu "development" di lingkungan pengembangan dan "production" di lingkungan produksi.
 * 
 * Dalam kode ini, `dev` diinisialisasi dengan perbandingan operator !== (tidak sama dengan) antara `process.env.NODE_ENV` dan "production". Jika nilai `process.env.NODE_ENV` bukan "production", maka `dev` akan bernilai true dan aplikasi akan dijalankan dalam mode pengembangan.
 * 
 * Ini penting karena dalam mode pengembangan, aplikasi biasanya dijalankan dengan fitur-fitur tambahan seperti pengembangan, pengembangan, dan penyederhanaan kode yang tidak diperlukan di lingkungan produksi. Dalam mode produksi, aplikasi dibuat menjadi lebih efisien dan dioptimalisasi untuk kinerja.
 */

const dev = process.env.NODE_ENV !== "production";
// inisialisasi app dengan nextjs agar bisa menggunakan next js di satu server
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("user connected with id: ", socket.id);

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
