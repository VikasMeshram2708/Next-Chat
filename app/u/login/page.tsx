"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [teye, setTeye] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action="" className="space-y-2">
            <Input type="text" placeholder="Email" />
            <div className="relative">
              <Input type={teye ? "text" : "password"} placeholder="Password" />
              <span
                onClick={() => setTeye((prev) => !prev)}
                className="cursor-pointer absolute top-3 right-3"
              >
                {teye ? <EyeIcon /> : <EyeClosedIcon />}
              </span>
            </div>
            <Button className="w-full">Login</Button>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <span>
            Alreay a User ?{" "}
            <Link
              href="/u/signup"
              className="hover:text-blue-500 hover:underline"
            >
              Sign up
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
