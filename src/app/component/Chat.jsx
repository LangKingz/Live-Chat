"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const Chat = () => {
  const [messages, setMessages] = useState("");
  const [chat, setChat] = useState([]);
  const { data: session } = useSession();

  console.log("Session:", session); // Debug

  useEffect(() => {
    socket.on("chat message", (msg) => {
      console.log("Pesan diterima:", msg); // Debugging log
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const handleClick = () => {
    if (messages.trim() !== "" && session) {
      const msg = {
        user: session.user.username, // Pastikan session.user.name benar
        text: messages,
        time: new Date().toLocaleTimeString("id-ID", {
          hour: "numeric",
          minute: "numeric",
        }),
      };
      console.log("Mengirim pesan:", msg); // Debugging log
      socket.emit("chat message", msg);
      setMessages("");
    }
  };

  return (
    <div>
      <div className="overflow-y-scroll h-[400px] bg-blue-500">
        {chat.map((e) => (
          <div key={e} className={`chat ${e.user === session?.user.username ? "chat-end" : "chat-start"}`}>
            <div className="chat-header">
              {e.user}
              <time className="text-xs opacity-50">{e.time}</time>
            </div>
            <div className="chat-bubble">{e.text}</div>
            <div className="chat-footer opacity-50">{e.user !== session?.user.username ? "seen" : ""}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <input type="text" className="input input-bordered" value={messages} onChange={(e) => setMessages(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleClick()} />
        <button onClick={handleClick} className="btn-success btn text-white">
          Kirim
        </button>
      </div>
    </div>
  );
};

export default Chat;
