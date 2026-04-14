"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../app/auth.js";
import { createOrderInAPI, getOrdersFromAPI } from "../service/order.service";
export const placeOrderAction = async (orderData) => {
  try {
    const session = await auth();
    const token = session?.user?.accessToken || null;

    console.log("TOKEN:", token);
    console.log("BASE_URL:", process.env.NEXT_PUBLIC_API_URL);

    const apiPayload = {
      orderDetailRequests: orderData.orderItems.map((item) => ({
        productId: item.productId,
        orderQty: item.quantity,
      })),
    };

    console.log("PAYLOAD:", JSON.stringify(apiPayload));

    const data = await createOrderInAPI(apiPayload, token);
    revalidatePath("/orders");
    return { success: true, payload: data.payload };
  } catch (error) {
    console.log("ERROR:", error.message);
    return { success: false, error: error.message };
  }
};

export const getOrdersAction = async () => {
  try {
    const session = await auth();
    const token = session?.user?.accessToken || null;

    const data = await getOrdersFromAPI(token);

    console.log("ORDERS RESPONSE:", JSON.stringify(data));

    return { success: true, payload: data.payload };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
