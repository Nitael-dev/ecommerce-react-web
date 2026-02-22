import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { getProductById } from "../services/products";
import type { ProductProps } from "../interfaces/products";
import { handleCart } from "../utils/cart";
import { useMemo } from "react";

export function Checkout() {
  const { user, tempCart, setTempCart, fetchUser } = useAuth();

  const productsId = useMemo(
    () => (user ? user.cart.map(({ id }) => id) : tempCart.map(({ id }) => id)),
    [tempCart, user],
  );

  const { data, isLoading } = useQuery({
    queryKey: ["cartProducts", productsId],
    queryFn: () => getProductById<ProductProps[]>(productsId),
    enabled: !!productsId && productsId.length !== 0,
  });

  return (
    <div className="page">
      <div className="container">
        <div className="page-title">Checkout</div>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Summary</h2>
            {isLoading ? (
              <div>Loading...</div>
            ) : productsId?.length === 0 ? (
              <div className="home-subtitle">Your cart is empty!</div>
            ) : (
              data?.map((product) => {
                const currentQuantity =
                  (user
                    ? user.cart.find(({ id }) => id === product.id)?.quantity
                    : tempCart.find(({ id }) => id === product.id)?.quantity) ||
                  0;

                return (
                  <div key={product.id} className="checkout-item">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="checkout-item-image"
                    />
                    <div className="checkout-item-details">
                      <h3 className="checkout-item-name">{product.name}</h3>
                      <p className="checkout-item-price">
                        ${product.price} each
                      </p>
                    </div>
                    <div className="checkout-item-controls">
                      <div className="quantity-controls">
                        <button
                          onClick={() => {
                            handleCart({
                              fetchUser,
                              product,
                              setTempCart,
                              type: "minus",
                              user,
                            });
                          }}
                          className="quantity-btn"
                        >
                          -
                        </button>
                        <span className="quantity-value">
                          {currentQuantity}
                        </span>
                        <button
                          onClick={() => {
                            handleCart({
                              fetchUser,
                              product,
                              setTempCart,
                              type: "plus",
                              user,
                            });
                          }}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>
                      <p className="checkout-item-total">
                        ${(product.price * currentQuantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => {
                          handleCart({
                            fetchUser,
                            product,
                            setTempCart,
                            type: "remove",
                            user,
                          });
                        }}
                        className="btn btn-secondary btn-small"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
