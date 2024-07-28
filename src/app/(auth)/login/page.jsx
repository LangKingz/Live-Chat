"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const LoginPages = () => {
  const { push } = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = e.target.username.value;
      const password = e.target.password.value;

      if (username && password) {
        const res = await signIn("credentials", {
          username,
          password,
          redirect: false,
          callbackUrl: "/",
        });
        if (res.ok) {
          push("/");
        }
      } else {
        alert("username and password is required");
      }

      // console.log({ username, password });
    } catch (error) {}
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="shadow lg:w-1/3 p-10 rounded-xl flex flex-col gap-4">
        <h1 className="text-3xl text-center">Sign up</h1>
        <input type="text" placeholder="username" name="username" className="input input-bordered w-full" />
        <input type="password" placeholder="password" name="password" className="input input-bordered w-full" />
        <button className="btn bg-gray-800 text-white  hover:bg-gray-900" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default LoginPages;
