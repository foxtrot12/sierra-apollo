import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import ProductCardCarousel from "./components/productCardCarousel";
import { ProductProvider } from "./contexts/productStateContext";
import { Products } from "./mockProducts";
import Cart from "./components/cart/cart";
import { RoutesList } from "./routes";
import { App as CapApp } from "@capacitor/app";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    CapApp.addListener("backButton", () => {
      if (location.pathname === RoutesList.home) {
        CapApp.exitApp();
      } else {
        navigate(-1);
      }
    });

    return () => {
      CapApp.removeAllListeners();
    };
  }, [location, navigate]);

  return (
    <ProductProvider>
      <main className="w-full h-full flex font-mono items-center flex-col bg-primary">
        <Header />
        <Routes>
          <Route
            path={RoutesList.home}
            element={<ProductCardCarousel products={Products} />}
          />
          <Route path={RoutesList.cart} element={<Cart />} />
        </Routes>
      </main>
    </ProductProvider>
  );
}

export default App;
