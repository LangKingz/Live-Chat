"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Homepages = () => {
  const [room, setRoom] = useState("");
  const { data: session } = useSession();
  const { push } = useRouter();

  const handleRoom = (e) => {
    e.preventDefault();
    push(`/chat/${room}`);
  };

  return (
    <>
      <div className={``}>
        <nav className="flex justify-between p-3">
          <p className="font-bold text-xl">Dashboard</p>
          <button onClick={() => signOut()} className="btn  btn-error text-white">
            Logout
          </button>
        </nav>
        <div className="flex flex-col justify-around min-h-screen items-center">
          <div className="flex flex-col">
            <p className="text-center font-bold text-xl">Hallo, {session?.user?.name}</p>
          </div>

          <form action="" onSubmit={handleRoom}>
            <div className="flex flex-col gap-3">
              <label className="" htmlFor="">
                Enter room
              </label>
              <input onChange={(e) => setRoom(e.target.value)} type="text" name="room" className="input input-bordered" />
              <button className="btn btn-primary">Enter</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Homepages;
