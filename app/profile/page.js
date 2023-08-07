"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { logoutUser } from "../services/user";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../store/actions/user";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/urls";
import ProfilePicture from "../components/inputs/ProfilePicture";
import Link from "next/link";

const userOrders = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/users/orders`, {
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

const Page = () => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: (data) => {
      toast.success("Logout Successfully!");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.message);
    },
  });

  const logoutHandler = () => {
    dispatch(logout);
    router.push("/");
    mutate();
  };
  const userState = useSelector((state) => state.user);
  const [userInfo, setuserInfo] = useState({});

  useEffect(() => {
    if (!userState?.userInfo) {
      router.push("/");
    }
    setuserInfo(userState?.userInfo);
  }, [userState, router]);

  const { data, isFetching } = useQuery({
    queryFn: () => userOrders(),
    queryKey: ["users"],
  });

  useEffect(() => {
    setOrders(data?.allOrders);
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Profile
          </h1>
          <button
            onClick={logoutHandler}
            className="hidden rounded-sm hover:bg-red-500 hover:text-white border-b px-4 py-2 font-semibold transition-colors duration-150 md:block"
          >
            Logout
          </button>{" "}
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ProfilePicture avatar={userInfo?.avatar} />
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  Personal Information
                </h2>
                <div className="p-2 rounded-full border drop-shadow-md hover:bg-slate-200 cursor-pointer">
                  <TbEdit />
                </div>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                      {userInfo?.name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {userInfo?.email}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      Near Hell, City, State, ZIP
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      123-456-7890
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Social Media
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <a
                        href="https://twitter.com/nike"
                        className="text-blue-500 hover:underline"
                      >
                        Twitter
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto py-6 sm:px-4">
          <div className="mt-6 w-full overflow-hidden lg:mt-0 lg:flex-1">
            <h1 className="mx-4 text-center text-2xl font-semibold lg:text-start">
              My Orders
            </h1>
            <div className="mx-auto w-full px-4">
              <div className="py-8">
                <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
                  <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                    <table className="relative min-h-[200px] min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm uppercase text-gray-800 font-semibold min-w-[170px]"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm uppercase text-gray-800 font-semibold min-w-[100px]"
                          >
                            Total Products
                          </th>
                          <th
                            scope="col"
                            className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm uppercase text-gray-800 font-semibold min-w-[180px]"
                          >
                            Ordered at
                          </th>
                          <th
                            scope="col"
                            className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm uppercase text-gray-800 font-semibold min-w-[100px]"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {isFetching ? (
                          <tr className="absolute top-16 left-[50%] translate-x-[-50%]">
                            <td className="w-full">
                              <Image
                                width={100}
                                height={100}
                                className="h-24 w-24"
                                src="/assets/loader2.svg"
                                alt="loader"
                              />
                            </td>
                          </tr>
                        ) : orders?.length === 0 ? (
                          <tr className="absolute top-24 left-[50%] translate-x-[-50%]">
                            <td className="w-full text-center text-lg font-semibold">
                              {"You Haven't anything yet 😕"}
                            </td>
                          </tr>
                        ) : (
                          orders
                            ?.map((order) => (
                              <tr key={order?._id}>
                                <td className="border-b cursor-pointer border-gray-200 bg-white px-5 py-5 text-sm">
                                  <Link href={`order/${order?.slug}`}>
                                    <p className="max-w-[200px] truncate text-gray-900 transition-colors duration-150 hover:text-blue-400">
                                      {order.orderItems?.[0]?.product?.name}
                                    </p>
                                  </Link>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                  <p className="whitespace-no-wrap text-gray-900">
                                    {order?.orderItems.length}
                                  </p>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                  <p className="whitespace-no-wrap text-gray-900">
                                    {new Date(order?.updatedAt).toLocaleString(
                                      "en-US",
                                      {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                      }
                                    )}{" "}
                                  </p>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm capitalize">
                                  <div className="flex items-center justify-start gap-3">
                                    <span
                                      className={`w-2 h-2 rounded-full ${
                                        order?.orderStatus === "Processing"
                                          ? "bg-yellow-300"
                                          : order?.orderStatus === "Failed"
                                          ? "bg-red-500"
                                          : order?.orderStatus === "Delivered"
                                          ? "bg-green-500"
                                          : "bg-blue-500"
                                      } drop-shadow`}
                                    ></span>
                                    <span className="font-semibold">
                                      {order?.orderStatus}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))
                            .reverse()
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
