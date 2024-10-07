"use client";

import { signUpSchema } from "@/app/models/User";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// Define the type for form data using the inferred type from signUpSchemaa

export default function SignUpPage() {
  const router = useRouter();
  const [teye, setTeye] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<signUpSchema> = async (data) => {
    try {
      const res = await fetch("/api/u/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast({
          variant: "destructive",
          title: result?.message || "Sign Up Failed",
        });
        return; // Early return to prevent further actions
      }

      reset();
      toast({
        title: result?.message || "User Registered",
      });
      router.push("/login");
    } catch (error) {
      console.error(`Something went wrong. Sign Up Failed: ${error}`);
      toast({
        variant: "destructive",
        title: "An error occurred during sign up.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <Input
              {...register("username")}
              type="text"
              placeholder="User Name"
            />
            {errors.username && (
              <span className="text-sm text-red-500 font-bold">
                {errors.username.message}
              </span>
            )}
            <Input {...register("email")} type="email" placeholder="Email" />
            {errors.email && (
              <span className="text-sm text-red-500 font-bold">
                {errors.email.message}
              </span>
            )}
            <div className="relative">
              <Input
                {...register("password")}
                type={teye ? "text" : "password"}
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-sm text-red-500 font-bold">
                  {errors.password.message}
                </span>
              )}
              <span
                onClick={() => setTeye((prev) => !prev)}
                className="cursor-pointer absolute top-3 right-3"
              >
                {teye ? <EyeIcon /> : <EyeClosedIcon />}
              </span>
            </div>
            <Button className="w-full">Sign Up</Button>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <span>
            Already a User?{" "}
            <Link
              href="/u/login"
              className="hover:text-blue-500 hover:underline"
            >
              Login
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
