"use client";
import Image from "next/image";
import Chat from "./component/Chat";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? (
        <Chat />
      ) : (
        <button className="btn btn-success text-white" onClick={() => signIn()}>
          LOGIN
        </button>
      )}
    </main>
  );
}
