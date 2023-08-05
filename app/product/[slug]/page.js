import axios from "axios";
import ProductClient from "./ProductClient";
import { API_URL } from "@/app/utils/urls";

const getProducts = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/products/`);

    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message) {
      return new Error(error.response.data.message);
    }
    return new Error(error.message);
  }
};

const getProduct = async (slug) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/products/${slug}`);

    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message) {
      return new Error(error.response.data.message);
    }
    return new Error(error.message);
  }
};

export default async function Page({ params }) {
  // console.log(params);

  const products = await getProducts();
  const product = await getProduct(params.slug);

  return <ProductClient productDetails={product} products={products} />;
}
