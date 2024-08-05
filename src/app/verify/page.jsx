"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const VerifiyPages = () => {
  const [code, setCode] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        code,
        callbackUrl: "/",
        redirect: false,
      });

      if (res.ok) {
        push("/");
      } else {
        alert("Kode verifikasi salah");
      }
    } catch (error) {
      console.log("kesalahan terjadi di verifikasi", error);
      alert("Kode verifikasi salah");
      throw error;
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit} action="" className="p-10 bg-white shadow flex flex-col gap-4">
        <input type="text" placeholder="kode verikasi " className="input input-bordered" value={code} onChange={(e) => setCode(e.target.value)} />
        <button className="btn btn-primary " type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default VerifiyPages;
