"use client"

import { signIn } from "next-auth/react"

const signInAction = async (data) => {
  const result = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false, 
  });

  if (result?.error) {
    alert("Invalid credentials");
  } else {
    router.push("/");
    router.refresh(); 
  }
};
export { signInAction };