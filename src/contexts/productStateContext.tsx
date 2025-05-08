import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../components/productCard/productCard";

interface ProductContextType {
  savedProducts: Product[];
  passedProducts: Product[];
  cartProducts: Product[];
  addSavedProduct: (product: Product) => void;
  removeSavedProduct: (id: string) => void;
  addPassedProduct: (product: Product) => void;
  removePassedProduct: (id: string) => void;
  addCartProduct: (product: Product) => void;
  removeCartProduct: (id: string) => void;
  clearCart: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [passedProducts, setPassedProducts] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const addSavedProduct = (product: Product) => {
    setSavedProducts((prev) => [...prev, product]);
  };
  const removeSavedProduct = (id: string) => {
    setSavedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addPassedProduct = (product: Product) => {
    setPassedProducts((prev) => [...prev, product]);
  };
  const removePassedProduct = (id: string) => {
    setPassedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addCartProduct = (product: Product) => {
    setCartProducts((prev) => [...prev, product]);
  };
  const removeCartProduct = (id: string) => {
    setCartProducts((prev) => prev.filter((p) => p.id !== id));
  };
  const clearCart = () => {
    setCartProducts([]);
  };

  return (
    <ProductContext.Provider
      value={{
        savedProducts,
        passedProducts,
        cartProducts,
        addSavedProduct,
        removeSavedProduct,
        addPassedProduct,
        removePassedProduct,
        addCartProduct,
        removeCartProduct,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// Custom hook
export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
