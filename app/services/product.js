import axios from "axios";
import { API_URL } from "../utils/urls";

export const uploadThumbnail = async ({ formData }) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/products/uploadThumbnail`,
      formData,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const uploadShowImages = async ({ formData }) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/products/uploadShowImages`,
      formData,
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const createProduct = async ({ formData }) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/products/`,
      JSON.stringify(formData),
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const updateProduct = async ({ formData, slug }) => {
  try {
    const { data } = await axios.put(
      `${API_URL}/api/products/${slug}`,
      JSON.stringify(formData),
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const deleteProduct = async ({ slug }) => {
  try {
    const { data } = await axios.delete(`${API_URL}/api/products/${slug}`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getProduct = async ({ slug }) => {
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

export const handleWishlist = async ({ slug }) => {
  try {
    const res = await fetch(`${API_URL}/api/products/wishlist/${slug}`, {
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

export const getWishlist = async () => {
  try {
    const res = await fetch(`${API_URL}/api/products/wishlist`, {
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

export const createReview = async ({ formData }) => {
  try {
    // const { data } = await axios.post(
    //   `${API_URL}/api/products/reviews/`,
    //   formData,
    //   {
    //     withCredentials: true,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    const res = await fetch(`${API_URL}/api/products/reviews`, {
      method: "POST",
      credentials: "include",
      body: formData,
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: "5",
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

export const deleteReview = async ({ formData }) => {
  try {
    // const { data } = await axios.delete(`${API_URL}/api/products/reviews/`, {
    //   data: formData,
    //   withCredentials: true,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    const res = await fetch(`${API_URL}/api/products/reviews`, {
      method: "DELETE",
      credentials: "include",
      body: formData,
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: "5",
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

export const handleCart = async ({ formData }) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/products/cart`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message) {
      return new Error(error.response.data.message);
    }
    return new Error(error.message);
  }
};

export const getCart = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/products/cart`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message) {
      return new Error(error.response.data.message);
    }
    return new Error(error.message);
  }
};

export const removeFromCart = async ({ formData }) => {
  try {
    const { data } = await axios.delete(`${API_URL}/api/products/cart`, {
      data: formData,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message) {
      return new Error(error.response.data.message);
    }
    return new Error(error.message);
  }
};
