import axios from "axios";
import { API_URL } from "../utils/urls";

export const registerUser = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/users/register`,
      {
        name,
        email,
        password,
      },
      { withCredentials: true }
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/users/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const logoutUser = async () => {
  try {
    // const { data } = await axios.post(`${API_URL}/api/users/logout`, {
    //   withCredentials: true,
    // });
    const res = await fetch(`${API_URL}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};


export const getAdminData = async () => {
  try {
    // const { data } = await axios.get(`${API_URL}/api/users/adminProducts`, {
    //   withCredentials: true,
    // });
    const res = await fetch(`${API_URL}/api/users/adminProducts`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return new Error(error.response.data.message);
    }
    return new Error(error.message);
  }
};

export const userProfile = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/users/profile`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return new Error(error.response.data.message);
    }
    return new Error(error.message);
  }
};
