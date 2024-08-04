"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io();

const ChatPages = ({ params }) => {
  const { roomId } = params;
  const [pesan, setPesan] = useState("");
  const [chat, setChat] = useState([]);
  const { data: session } = useSession();
  const scrollReff = useRef();

  console.log(session);

  useEffect(() => {
    if (scrollReff.current) {
      scrollReff.current.scrollIntoView({ behavior: "smooth" });
    }

    if (roomId) {
      socket.emit("join_room", roomId);
      console.log(roomId);
    }
    socket.on("message", (msg) => {
      if (msg.roomId === roomId) {
        setChat((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [roomId]);

  const kirimPesan = () => {
    const msg = {
      user: session.user?.name,
      text: pesan,
      date: new Date().toLocaleString("id-ID", {
        hour: "numeric",
        minute: "numeric",
      }),
      roomId: roomId,
    };
    socket.emit("message", msg);
    setPesan("");
  };

  return (
    <div className="flex flex-col items-center ">
      <h1>room : {roomId}</h1>
      <div className=" overflow-y-scroll h-[400px] p-3 w-[400px]">
        {chat.map((e) => (
          <div key={e} className={`chat ${session.user?.name === e.user ? "chat-end" : "chat-start"}`}>
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
      <div ref={scrollReff}></div>
      <div className="flex gap-4">
        <input className="input input-bordered" type="text" value={pesan} onChange={(e) => setPesan(e.target.value)} onKeyPress={(e) => e.key === "Enter" && kirimPesan()} />
        <button className="btn mx-3 btn-square rounded-full btn-success text-white" onClick={kirimPesan}>
          Kirim
        </button>
      </div>
    </div>
  );
};

export default ChatPages;
