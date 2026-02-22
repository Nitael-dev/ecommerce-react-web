import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/products";
import { useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { handleCart } from "../utils/cart";
import type { ProductProps } from "../interfaces/products";

export function ProductDetails() {
  const { tempCart, user, setTempCart, fetchUser } = useAuth();
  const { productId } = useParams();

  const { data: product } = useQuery({
    queryKey: ["productsById", productId],
    queryFn: () => getProductById<ProductProps>([productId!]),
    enabled: !!productId,
  });

  if (!product) {
    return <h1>Loading...</h1>;
  }

  const currentQuantity = user
    ? user.cart.find(({ id }) => id === product.id)?.quantity
    : tempCart.find(({ id }) => id === product.id)?.quantity;

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
            <button
              onClick={() =>
                handleCart({
                  fetchUser,
                  product,
                  setTempCart,
                  user,
                })
              }
              className="btn btn-primary"
            >
              Add to Cart
              {currentQuantity ? ` (${currentQuantity})` : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
