import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { userSchema } from "@/schemas/user";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { errorExtract } from "@/utils/errorUtils";
import { Link, useNavigate } from "react-router";

const Register = () => {


  
  const form = useForm({
    resolver:zodResolver(userSchema),
    defaultValues:{
      username:"",
      email:"",
      password:"",
      confirmPassword:""
    }
  });

    const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: async (data) =>{
      const response = await api.post("/auth/register",data);
      return response.data;
    },
    onSuccess:(data) =>{
      console.log("user creation successfully",data);
      form.reset();
      navigate("/login")
    },
    onError:(err) =>{
      console.log("error",errorExtract(err));
      
    }
  })

  const onsubmit = (data) =>{
    console.log(data);
    
    registerMutation.mutate(data);


  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">

        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle > Create to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example @gmail.com" {...field} />
                      </FormControl>
                      
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input   type="password"placeholder="*********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ConfirmPassword</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="*********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className={"w-full"} type="submit" disable={registerMutation.isPending}>
                  {
                    registerMutation.isPending?
                  "Registering...."
                  :
                  "Register"
                  }
                  </Button>
              </form>
                <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
            </Form>
            
          </CardContent>
        </Card>
      </div>
  );
};

export default Register;


