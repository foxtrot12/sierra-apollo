import Header from "./components/header";
import ProductCard from "./components/productCard/productCard";

function App() {
  return (
    <main className="w-screen h-screen flex items-center flex-col bg-primary">
        <Header />
        <ProductCard
          id="2"
          name="morgan blouse"
          brand="kazo"
          price={4500}
          originalPrice={6000}
          discountPercentage={25}
          imageUrl="https://cdn.shopify.com/s/files/1/0261/2386/2082/files/KZ01319YELLOWMULTI.jpg?v=1743161024"
        />
    </main>
  );
}

export default App;
