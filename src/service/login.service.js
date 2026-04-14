export const loginService = async (userData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_API_URL}/auths/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    },
  );

  const user = await res.json();

  if (!res.ok) {
    throw new Error(user?.error || "Login failed");
  }

  return user;
};
