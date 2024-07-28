"use client";

import React, { useMemo } from "react";

const socket = require("socket.io-client")("http://localhost:3001");
const DemoPages = () => {
  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
  socket.on("connect", () => {
    console.log("user connected");
  });

  return <div>DemoPages</div>;
};

export default DemoPages;
