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
import { useToast } from "@/hooks/use-toast";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { EyeIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

// Define the type for form data using the inferred type from loginSchema

export default function LoginPage() {
  const [teye, setTeye] = useState(false);
  const { toast } = useToast();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        ...user, // Pass the login data to the signIn function
        redirect: false,
      });

      if (!res?.ok) {
        toast({
          variant: "destructive",
          title: res?.error || "Login Failed",
        });
        return; // Early return to prevent further actions
      }

      toast({
        title: "Logged In",
      });
      router.push("/");
    } catch (error) {
      console.error(`Something went wrong. Login Failed: ${error}`);
      toast({
        variant: "destructive",
        title: "An error occurred during login.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-2">
            <Input
              value={user?.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              type="text"
              placeholder="Email"
            />

            <div className="relative">
              <Input
                value={user?.password}
                onChange={(e) =>
                  setUser({
                    ...user,
                    password: e.target.value,
                  })
                }
                type={teye ? "text" : "password"}
                placeholder="Password"
              />
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
            Already a User?{" "}
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
