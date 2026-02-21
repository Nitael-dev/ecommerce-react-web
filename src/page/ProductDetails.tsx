import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/products";
import { useParams } from "react-router";

export function ProductDetails() {
  const { productId } = useParams();

  const { data: product } = useQuery({
    queryKey: ["productsById", productId],
    queryFn: () => getProductById(productId!),
  });

  if (!product || productId !== product.id) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">${product.price}</p>
            <p className="product-detail-description">{product.description}</p>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
