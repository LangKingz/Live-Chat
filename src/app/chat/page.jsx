"use client";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io();

const ChatPages = () => {
  const [pesan, setPesan] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const kirimPesan = () => {
    const msg = {
      user: "Obi-Wan Kenobi",
      text: pesan,
      date: new Date().toLocaleString("id-ID",{
        hour: "numeric",
        minute: "numeric",
      }),
    }
    socket.emit("message", msg);
    setPesan("");
  };

  return (
    <div>
      <div className="">
        {chat.map((e) => (
          <div key={e} className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="chat-header">
              {e.user}
              <time className="text-xs opacity-50">{e.date}</time>
            </div>
            <div className="chat-bubble">{e.text}</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        ))}
      </div>
      <input className="input input-bordered" type="text" value={pesan} onChange={(e) => setPesan(e.target.value)} onKeyPress={(e) => e.key === "Enter" && kirimPesan()} />
      <button className="btn mx-3 btn-square rounded-full btn-success text-white" onClick={kirimPesan}>
        Kirim
      </button>
    </div>
  );
};

export default ChatPages;
