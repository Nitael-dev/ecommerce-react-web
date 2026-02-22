import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { getProductById } from "../services/products";
import type { ProductProps } from "../interfaces/products";
import { handleCart } from "../utils/cart";
import { useMemo } from "react";
import { useNavigate } from "react-router";

export function Checkout() {
  const { user, tempCart, setTempCart, fetchUser } = useAuth();

  const navigate = useNavigate();

  const productsId = useMemo(
    () => (user ? user.cart.map(({ id }) => id) : tempCart.map(({ id }) => id)),
    [tempCart, user],
  );

  const { data, isLoading } = useQuery({
    queryKey: ["cartProducts", productsId],
    queryFn: () => getProductById<ProductProps[]>(productsId),
    enabled: !!productsId && productsId.length !== 0,
  });

  function currentQuantity(productId: string) {
    return (
      (user
        ? user.cart.find(({ id }) => id === productId)?.quantity
        : tempCart.find(({ id }) => id === productId)?.quantity) || 0
    );
  }

  function placeOrder() {
    if (tempCart.length === 0 || (user && user.cart.length === 0)) {
      navigate("/");
      return;
    }
    alert("Successful Order!");
    if (user) {
      fetchUser({ ...user, cart: [] });
    } else {
      setTempCart("", "clear");
    }
    navigate("/");
  }

  const total =
    data?.reduce((acc, current) => {
      acc += current.price * currentQuantity(current.id);
      return acc;
    }, 0) ?? 0;

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
                          {currentQuantity(product.id)}
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
                        $
                        {(product.price * currentQuantity(product.id)).toFixed(
                          2,
                        )}
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
          <div className="checkout-summary">
            <h2 className="checkout-section-title">Total</h2>
            <div className="checkout-total">
              <p className="checkout-total-label">Subtotal:</p>
              {isLoading ? (
                <p className="checkout-total-value">Calculating...</p>
              ) : (
                <p className="checkout-total-value">${total?.toFixed(2)}</p>
              )}
            </div>
            <div className="checkout-total">
              <p className="checkout-total-label">Total:</p>
              {isLoading ? (
                <p className="checkout-total-value checkout-total-final">
                  Calculating...
                </p>
              ) : (
                <p className="checkout-total-value checkout-total-final">
                  ${total?.toFixed(2)}
                </p>
              )}
            </div>
            <button
              onClick={() => placeOrder()}
              className="btn btn-primary btn-large btn-block"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
