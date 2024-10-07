"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Navbar() {
  const { status: loginStatus } = useSession();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const res = await signOut();
      if (!res) {
        toast({
          variant: "destructive",
          title: "Logout Failed",
        });
      }
      toast({
        title: "Logged Out",
      });
    } catch (error) {
      console.log(`Something went wrong. Logout Failed : ${error}`);
    }
  };

  return (
    <header className="sticky top-0 bg-background/50 backdrop-blur z-40 w-full">
      <nav className="max-w-3xl mx-auto border-b flex items-center justify-between px-4 py-2">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          <Link href="/">Next Chat</Link>
        </h1>
        {loginStatus === "loading" ? (
          <Skeleton className="w-44 h-10 rounded" />
        ) : loginStatus === "authenticated" ? (
          <Button onClick={handleLogout} className="space-x-2">
            <span>
              <LogOut />
            </span>
            <span className="font-bold">Logout</span>
          </Button>
        ) : (
          <Button className="font-bold">
            <Link href="/u/signup">Login / Sign Up</Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
