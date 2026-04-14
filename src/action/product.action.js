"use server";

import { auth } from "../app/auth.js";
import {
  getProducts,
  getProductsByCategory,
  getProductsFromHomeworkAPI,
} from "../service/product.service";

const getToken = async () => {
  const session = await auth();
  return session?.user?.accessToken || null;
};


export async function getAllProductsAction() {
  try {
    const token = await getToken();
    const response = await getProductsFromHomeworkAPI(token);

    if (response.payload && Array.isArray(response.payload)) {
      const transformedProducts = response.payload.map((product) => ({
        ...product,
        productId: product.productId,
        productName: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        star: product.star || 0,
        id: product.productId,
        category: "Skincare",
      }));
      return { success: true, data: transformedProducts };
    }

    return { success: true, data: [] };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getProductsByCategoryAction(categoryId) {
  try {
    const token = await getToken();
    const products = await getProductsByCategory(categoryId, token);
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getProductByIdAction(productId) {
  try {
    const token = await getToken();
    const response = await getProductsFromHomeworkAPI(token);

    if (response.payload && Array.isArray(response.payload)) {
      const product = response.payload.find((p) => p.productId === productId);
      if (!product) {
        return { success: false, error: "Product not found" };
      }

      const transformedProduct = {
        ...product,
        productId: product.productId,
        productName: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        star: product.star || 0,
        category: "Skincare",
      };

      return { success: true, data: transformedProduct };
    }

    return { success: false, error: "Product not found" };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
