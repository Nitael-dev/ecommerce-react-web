import { Link } from "react-router";
import type { ProductProps } from "../interfaces/products";

interface CardProps {
  product: ProductProps;
}

export function ProductCard({ product: { image, name, price } }: CardProps) {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-card-image" />
      <div className="product-card-content">
        <h3 className="product-card-name">{name}</h3>
        <p className="product-card-price">{price}</p>
        <div className="product-card-actions">
          <Link to="product-details" className="btn btn-secondary">
            View Details
          </Link>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
