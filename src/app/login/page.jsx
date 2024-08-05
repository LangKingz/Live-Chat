"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const LoginPages = () => {
  const { push } = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let username = e.target.username.value;
    let password = e.target.password.value;

    try {
      const res = await signIn("credentials", {
        username,
        password,
        callbackUrl: "/",
        redirect: false,
      });

      if (res.ok) {
        push("/");
      } else {
        alert("Username atau Password Salah");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat login");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form className="p-10 bg-white shadow flex flex-col gap-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center">LOGIN</h1>
        <input type="text" name="username" placeholder="Username" className="input input-bordered input-primary w-full max-w-xs" />
        <input type="password" name="password" placeholder="Password" className="input input-bordered input-info w-full max-w-xs" />
        <button type="submit" className="btn btn-primary">
          KIRIM
        </button>
      </form>
    </div>
  );
};

export default LoginPages;
