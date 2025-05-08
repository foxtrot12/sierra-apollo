import Header from "./components/header";
import ProductCardCarousel from "./components/productCardCarousel";
import { Test } from "./components/test";
import { ProductProvider } from "./contexts/productStateContext";
import { Products } from "./mockProducts";

function App() {
  return (
    <ProductProvider>
      <Test/>
      <main className="w-screen h-screen flex font-mono items-center flex-col bg-primary">
        <Header />
        <ProductCardCarousel products={Products} />
      </main>
    </ProductProvider>
  );
}

export default App;
