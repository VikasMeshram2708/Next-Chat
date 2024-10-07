"use client";

import ChatBox from "@/components/ChatBox";
import Cover from "@/components/Cover";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  useEffect(() => {}, [session, status]);

  return (
    <main className="relative min-h-screen">
      {status === "loading" && <Cover />}
      <div className="py-10">
        <ChatBox />
      </div>
    </main>
  );
}
