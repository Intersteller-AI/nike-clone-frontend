"use client"
import axios from "axios";
import { Hero, ProductCard, Wrapper } from "./components";
import { API_URL } from "./utils/urls";
import { use, useState } from "react";


const getAllProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/api/products/`, {
      method: "GET",
      credentials: "include",
      next: {
        revalidate: "60",
      }
    })

    const data = await res.json()

    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message) {
      return new Error(error.response.data.message);
    }
    return new Error(error.message);
  }
};

// const userProfile = async () => {
//   try {
//     const { data } = await axios.get(`${API_URL}/api/users/profile`, {
//       withCredentials: true,
//     });
//     return data;
//   } catch (error) {
//     if (error.response && error.response.data.message) {
//       return new Error(error.response.data.message);
//     }
//     return new Error(error.message);
//   }
// };

const userProfile = async () => {
  try {
    const res = await fetch(`${API_URL}/api/users/profile`, {
      method: "GET",
      credentials: "include",
    })

    const data = await res.json()

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return new Error(error.response.data.message);
    }
    return new Error(error.message);
  }
};


export default function Home() {
  const [products, setProducts] = useState(use(getAllProducts()));
  const [userData, setUserData] = useState(use(userProfile()));

  return (
    <main>
      <Hero />
      {/* Heading and Paragraph */}
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 leading-tight font-semibold">
            Cusioning for Your Miles
          </div>
          <div className="text-md md:text-xl">
            A lightweight Nike ZoomX midsole is combined with increased stack
            heights to help provide cushioning during extended streching of
            running.
          </div>
        </div>
        {/* products cards section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products.map((product, index) => (
            <ProductCard
              key={`procard_${product?.slug}`}
              data={product}
              userWishlist={userData?.wishlist}
            />
          ))}
        </div>
      </Wrapper>
    </main>
  );
}
