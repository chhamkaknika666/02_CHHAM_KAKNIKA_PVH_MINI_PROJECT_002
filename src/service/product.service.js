export const getProducts = async (token) => {
  const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL || "http://localhost:8080";
  const response = await fetch(`${apiUrl}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error("Failed to fetch products from API");
  return await response.json();
};

export const getProductsByCategory = async (categoryId, token) => {
  const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL || "http://localhost:8080";
  const response = await fetch(`${apiUrl}/products?categoryId=${categoryId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error("Failed to fetch products by category");
  return await response.json();
};

export const getProductsFromHomeworkAPI = async (token) => {
  const apiUrl = "https://homework-api.noevchanmakara.site/api/v1/products";
  try {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status}`, errorText);
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();
    if (data.payload && Array.isArray(data.payload)) {
      return {
        ...data,
        payload: data.payload.map((product) => ({
          ...product,
          productName: product.name,
        })),
      };
    }
    return data;
  } catch (error) {
    console.error("getProductsFromHomeworkAPI error:", error.message);
    throw error;
  }
};

export const createProductAPI = async (productData, token) => {
  const apiUrl = "https://homework-api.noevchanmakara.site/api/v1/products";
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Create failed (${response.status}): ${errorText}`);
  }
  return await response.json();
};