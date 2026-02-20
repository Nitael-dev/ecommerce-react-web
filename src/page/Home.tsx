import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products";
import { ProductCard } from "../components/ProductCard";

export function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="home-title">Welcome to ShopHub</h1>
        <p className="home-subtitle">
          Discover amazing products at great prices
        </p>
      </div>
      <div className="container">
        <h2 className="page-title">Our Products</h2>
        <div className="product-grid">
          {isLoading && data ? (
            <></>
          ) : (
            data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
