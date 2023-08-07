import { API_URL } from "./utils/urls";
import ProductsSection from "./components/main/ProductsSection";

const getAllProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/api/products/`, {
      method: "GET",
      credentials: "include",
      next: {
        revalidate: "60",
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message) {
      return new Error(error.response.data.message);
    }
    return new Error(error.message);
  }
};

export default async function Home() {
  const products = await getAllProducts();

  return <ProductsSection products={products} />;
}
