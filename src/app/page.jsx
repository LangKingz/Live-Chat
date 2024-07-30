import Image from "next/image";
import ChatPages from "./chat/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Chat Live</p>
      <ChatPages />
    </main>
  );
}
