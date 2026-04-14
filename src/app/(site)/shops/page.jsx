import React from "react";
import {
  getAllProductsAction,
  getProductsByCategoryAction,
} from "../../../action/product.action";
import ProductsClientPage from "../../../components/shop/ProductsClientPage";

export default async function ShopsPage({ searchParams }) {
  const params = await searchParams;
  const categoryId = params?.categoryId;

  const result = categoryId
    ? await getProductsByCategoryAction(categoryId)
    : await getAllProductsAction();

  if (!result.success) {
    return <div className="p-20 text-center">Error: {result.error}</div>;
  }

  const products = result.data;

  return (
    <main className="container mx-auto p-6">
      <ProductsClientPage products={products} />
    </main>
  );
}