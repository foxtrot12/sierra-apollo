import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import ProductCardCarousel from "./components/productCardCarousel";
import { ProductProvider } from "./contexts/productStateContext";
import { Products } from "./mockProducts";
import Cart from "./components/cart/cart";
import { RoutesList } from "./routes";

function App() {
  return (
    <ProductProvider>
      <main className="w-screen h-screen flex font-mono items-center flex-col bg-primary">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path={RoutesList.home}
              element={<ProductCardCarousel products={Products} />}
            />
            <Route path={RoutesList.cart} element={<Cart/>} />
          </Routes>
        </BrowserRouter>
      </main>
    </ProductProvider>
  );
}

export default App;
