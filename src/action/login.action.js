"use server";

import { signIn, signOut } from "../app/auth.js";
import { AuthError } from "next-auth";

export const signInAction = async (data) => {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password" };
    }
    throw error;
  }
};

export const logoutAction = async () => {
  await signOut({ redirectTo: "/login" });
};