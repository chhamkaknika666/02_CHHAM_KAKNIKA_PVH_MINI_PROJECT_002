export const registerService = async (request) => {
  const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL;

  const response = await fetch(`${apiUrl}/auths/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("text/html")) {
      throw new Error(
        "Server returned 404. Check if your API URL and backend are correct.",
      );
    }

    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return await response.json();
};
