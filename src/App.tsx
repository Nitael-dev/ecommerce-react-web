import { Route, Routes } from "react-router";
import "./App.css";
import { Home } from "./page/Home";
import { Checkout } from "./page/Checkout";
import { Auth } from "./page/Auth";
import { ProductDetails } from "./page/ProductDetails";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product-details" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
