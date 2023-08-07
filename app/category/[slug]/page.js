import axios from "axios";
import CategoryClient from "./CategoryClient";
import { API_URL } from "@/app/utils/urls";

const getCategory = async (slug) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/categories/${slug}`);

    const { products, category } = data;

    return {
      products,
      category,
    };
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message) {
      return new Error(error.response.data.message);
    }
    return new Error(error.message);
  }
};

export default async function Page({ params }) {
  const { products, category } = await getCategory(params.slug);

  return <CategoryClient products={products} category={category} />;
}
