"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Ellipsis } from "lucide-react/";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendChatSchema } from "@/app/models/ChatMessage";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  // DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export default function ChatBox() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<sendChatSchema>({
    resolver: zodResolver(sendChatSchema),
  });

  interface Message {
    id: string;
    msg: string;
  }
  const [messages, setMessages] = useState<Message[]>([]);

  const onSubmit: SubmitHandler<sendChatSchema> = (data) => {
    console.log("data", data);
    reset();
    toast({
      title: "Sent",
      variant: "default",
    });
    const newMessage: Message = {
      id: String(Math.floor(1000 * Math.random() * 9000)),
      msg: data?.msg,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleCommingSoon = () => {
    return toast({
      variant: "destructive",
      title: "Comming Soon",
    });
  };
  return (
    <div className="h-screen rounded-lg border-2 max-w-3xl mx-auto flex flex-col justify-between">
      <div className="flex justify-between border-b-2 items-center gap-1 px-4 py-2">
        <div className="flex items-center gap-1">
          <div className="rounded-full h-4 w-4 bg-green-500 animate-pulse"></div>
          <h2>Vikas Meshram</h2>
        </div>
        <div>
          <div>
            <span>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span>
                    <Ellipsis />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/u/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCommingSoon}>Subscription</DropdownMenuItem>
                  <DropdownMenuItem>
                    <span
                      className={buttonVariants({ variant: "destructive" })}
                    >
                      Clear Chat
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          </div>
        </div>
      </div>
      {messages?.length < 1 && (
        <span className="text-3xl font-bold text-center py-5">
          Start Messaging
        </span>
      )}
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg) => (
          <Card key={msg.id} className="mb-2">
            <CardHeader>
              <CardTitle>{msg.msg}</CardTitle>
            </CardHeader>
            <CardFooter>
              <p className="text-sm text-gray-500">Sent by Vikas</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-10 px-10 flex items-center justify-between gap-3"
      >
        <Input
          autoFocus
          {...register("msg", { required: true })}
          className=""
        />
        {errors?.msg && (
          <span className="text-sm text-red-500 font-bold">
            {errors?.msg?.message}
          </span>
        )}
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
