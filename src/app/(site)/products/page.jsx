import { getAllProductsAction, getProductsByCategoryAction } from "../../../action/product.action";
import ProductsClientPage from "../../../components/shop/ProductsClientPage";

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const categoryId = params?.categoryId;

  const result = categoryId
    ? await getProductsByCategoryAction(categoryId)
    : await getAllProductsAction();

  if (!result.success) {
    return <div className="p-20 text-center">Error: {result.error}</div>;
  }

  const products = Array.isArray(result.data) ? result.data : [];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Luxury beauty products</h1>
      <p className="text-gray-500 mb-8">
        Use the filters to narrow by price and brand.
      </p>

      <ProductsClientPage products={products} />
    </main>
  );
}