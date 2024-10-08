"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { LogOut, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface FetchedUser {
  username: string;
  email: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<FetchedUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/u/profile");
        const result = await res.json();
        setUser(result?.user);
      } catch (error) {
        console.error(`Failed to fetch user details: ${error}`);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen max-w-3xl mx-auto flex flex-col items-center justify-center p-6">
      <Card className="w-full">
        <CardHeader>
          <div className="relative flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/userLogo.jpg" alt="user" />
              <AvatarFallback>{user?.username}</AvatarFallback>
            </Avatar>
            <div className="w-5 h-5 bg-green-500 rounded-full absolute top-2 left-6"></div>
            <div>
              <p className="text-lg md:text-xl lg:text-2xl font-bold capitalize">
                {user?.username}
              </p>
              <p>{user?.email}</p>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="flex items-center justify-between py-10">
          <Button className="flex gap-1">
            <span>
              <Mail />
            </span>
            <span>{user?.email}</span>
          </Button>
          <Button className="flex gap-1">
            <span>
              <LogOut />
            </span>
            <span>Logout</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
