"use client";
import Image from "next/image";

import { signIn, signOut, useSession } from "next-auth/react";
import Homepages from "./components/Home";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <main className="">
      {session ? (
        <>
          <Homepages />
        </>
      ) : (
        <div className="flex h-screen justify-center items-center">
          <button className="btn btn-primary" onClick={() => signIn()}>
            Login
          </button>
        </div>
      )}
    </main>
  );
}
