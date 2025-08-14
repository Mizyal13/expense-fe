"use client";
import api from "@/lib/axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/login", { identifier, password });
      await Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Selamat datang kembali!",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "login gagal");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 text-black">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <div className="w-full flex flex-col items-center justify-center">
          <img src="image.png" className="w-20 h-20 " alt="" />
          <h2 className="text-2xl font-bold mb-4">Login</h2>
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          className="border p-2 w-full mb-3 rounded"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          type="text"
          placeholder="Email atau Username"
          required
        />
        <input
          className="border p-2 w-full mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm">
          Belum punya akun?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </form>
    </div>
  );
}
