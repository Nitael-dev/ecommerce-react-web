import { Link } from "react-router";
import type { ProductProps } from "../interfaces/products";

interface CardProps {
  product: ProductProps;
  action(): void;
  quantity?: number;
}

export function ProductCard({
  product: { id, image, name, price },
  action,
  quantity,
}: CardProps) {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-card-image" />
      <div className="product-card-content">
        <h3 className="product-card-name">{name}</h3>
        <p className="product-card-price">${price}</p>
        <div className="product-card-actions">
          <Link to={`/products/${id}`} className="btn btn-secondary">
            View Details
          </Link>
          <button onClick={() => action()} className="btn btn-primary">
            Add to Cart
            {quantity ? ` (${quantity})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
