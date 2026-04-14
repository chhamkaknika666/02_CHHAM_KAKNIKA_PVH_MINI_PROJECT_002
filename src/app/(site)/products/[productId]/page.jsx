import { getProductByIdAction } from "../../../../action/product.action";
import ProductDetailComponent from "../../../../components/ProductDetailComponent";

export default async function ProductDetailPage({ params }) {
  const { productId } = await params;

  const result = await getProductByIdAction(productId);

  if (!result.success) {
    return (
      <div className="p-20 text-center text-red-500">
        Error: {result.error}
      </div>
    );
  }

  const product = result.data;

  return <ProductDetailComponent product={product} />;
}