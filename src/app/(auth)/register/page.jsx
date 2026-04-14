"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerService } from "../../../service/register.service.js";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const fullName = data.fullName?.trim() || "";
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const registerData = {
      firstName,
      lastName,
      email: data.email,
      password: data.password,
      birthDate: data.birthDate,
    };

    try {
      const response = await registerService(registerData);

      if (response) {
        router.push("/login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-8 shadow-lg shadow-gray-200/60 sm:p-10">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Create account
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Fill in your details to get started.
        </p>
      </header>

      <form onSubmit={handleRegister} className="mt-8 space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            name="fullName"
            type="text"
            required
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime-500 outline-none transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="example@gmail.com"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime-500 outline-none transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime-500 outline-none transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Birthdate</label>
          <input
            name="birthDate"
            type="date"
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime-500 outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-lime-700 text-white py-3 rounded-xl font-semibold hover:bg-lime-800 disabled:bg-gray-300 transition-all"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <div className="mt-8 text-center space-y-4">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-lime-700 hover:underline"
          >
            Log in
          </Link>
        </p>
        <Link
          href="/"
          className="block text-sm text-gray-500 hover:text-gray-900"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
