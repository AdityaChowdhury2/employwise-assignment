"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CircleX, LoaderCircle, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .email(),
  password: z.string().min(4, "Password must be at least 4 characters long"),
});

// Define the type for the LoginSchema
type LoginFormData = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(LoginSchema) });
  const onSubmit = async (loginData: LoginFormData) => {
    setLoading(true);
    try {
      console.log("In login submit", loginData);
      //   console.log("object", process.env.NEXT_PUBLIC_API_BASE_URL);
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      const response = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      console.log("object", response);
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Login successful");
        // save token to local storage
        localStorage.setItem("token", data.token);
        // redirect to dashboard
        // console.log(router?.isReady ? "ready" : "not ready");
        router.push("/users/1");
      }
      console.log("", data);
    } catch (e) {
      console.log("error", e);
      toast.error("An error occurred. Please try again later");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  {...register("email", { required: true })}
                  required
                />
                {errors.email?.message && (
                  <p
                    role="alert"
                    className="flex gap-1 items-center text-xs pt-1 text-red-600"
                  >
                    <CircleX size={12} />
                    {errors.email?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  {...register("password", { required: true })}
                  required
                />
                {errors.password?.message && (
                  <p
                    role="alert"
                    className="flex gap-1 items-center text-xs pt-1 text-red-600"
                  >
                    <CircleX size={12} />
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderCircle size={18} className="animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
            {/* <p className="text-sm text-center text-gray-500">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-primary hover:underline">
                Sign up
              </a>
            </p> */}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
