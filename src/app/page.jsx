"use client";
import Image from "next/image";
import ChatPages from "./chat/page";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? (
        <>
          <button className="btn btn-primary" onClick={() => signOut()}>Logout</button>
          <p>Chat Live</p>
          <ChatPages />
        </>
      ) : (
        <button className="btn btn-primary" onClick={() => signIn()}>Login</button>
      )}
    </main>
  );
}
