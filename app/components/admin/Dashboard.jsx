"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";
import useCreateProductModal from "../../hooks/useCreateProductModal";
import { getAdminData } from "@/app/services/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProduct, getProduct } from "@/app/services/product";
import { toast } from "react-hot-toast";
import useUpdateProductModal from "@/app/hooks/useUpdateProductModal";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "@/app/store/reducers/product";
import Link from "next/link";

const ConfModal = ({
  cancelConf,
  setCancelConf,
  index,
  deleteProductMutate,
  isDeletingProduct,
  productSlug,
}) => {
  return (
    <div
      className={`${
        cancelConf === index ? "flex" : "hidden"
      } bg-white h-full absolute items-center justify-center gap-1`}
    >
      <button
        disabled={isDeletingProduct}
        onClick={() => deleteProductMutate(productSlug)}
        className="disabled:cursor-wait flex items-center gap-1 text-green-500 cursor-pointer hover:bg-green-300 rounded-md p-2"
      >
        <AiOutlineCheck />
        <span className="text-[12px] font-semibold">Confirm</span>
      </button>
      <button
        disabled={isDeletingProduct}
        onClick={() => setCancelConf(null)}
        className="disabled:cursor-not-allowed flex items-center gap-1 text-red-500 cursor-pointer hover:bg-red-300 rounded-md p-1"
      >
        <IoIosClose size={24} />
        <span className="text-[12px] font-semibold">Cancel</span>
      </button>
    </div>
  );
};

const Dashboard = () => {
  const createProduct = useCreateProductModal();
  const updateProduct = useUpdateProductModal();
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onCreate = useCallback(() => {
    createProduct.onOpen();
  }, [createProduct]);

  const {
    data: adminData,
    isLoading,
    refetch: refetchProducts,
  } = useQuery({
    queryFn: () => getAdminData(),
    queryKey: ["users"],
  });

  useEffect(() => {
    refetchProducts();
  }, [userState, refetchProducts]);

  const [cancelConf, setCancelConf] = useState(null);
  const [adminProducts, setAdminProducts] = useState([]);

  useEffect(() => {
    setAdminProducts(adminData?.adminProducts);
  }, [adminData]);

  const { mutate: deleteProductMutate, isLoading: isDeletingProduct } =
    useMutation({
      mutationFn: (slug) => deleteProduct({ slug: slug }),
      onSuccess: (message) => {
        refetchProducts();
        toast.success(message.message);
        setCancelConf(null);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
      mutationKey: ["admin"],
    });

  const [updateSlug, setupdateSlug] = useState(null);

  const { refetch } = useQuery({
    enabled: false,
    queryFn: () => getProduct({ slug: updateSlug }),
    onSuccess: (data) => {
      if (data) {
        dispatch(productActions.setProductInfo(data));
        updateProduct.onOpen();
      }
      if (updateSlug) {
        setupdateSlug(null);
      }
    },
    onError: (error) => {
      console.log(error);
    },
    queryKey: ["products"],
  });

  const handleUpdateProduct = useCallback((val) => {
    setupdateSlug(val);
  }, []);

  useEffect(() => {
    if (updateSlug) {
      refetch();
    }
  }, [updateSlug, refetch]);

  return (
    <div className="w-full overflow-y-scroll hide-scrollbar relative">
      <div className="max-w-7xl mx-auto py-6 sm:px-4">
        <div className="mt-6 w-full overflow-hidden lg:mt-0 flex justify-between px-4 items-center">
          <h1 className="mx-4 text-2xl font-semibold md:text-start">
            My Products
          </h1>
          <button
            disabled={isLoading}
            className="disabled:opacity-50 disabled:cursor-wait flex items-center gap-2 text-violet-500 cursor-pointer hover:bg-violet-600 rounded-md border-2 border-violet-600 p-2 hover:text-white"
            onClick={onCreate}
          >
            <MdAddShoppingCart />{" "}
            <span className="text-[12px] font-semibold">Add new product</span>
          </button>
        </div>
        <div className="mx-auto w-full px-4">
          <div className="py-8">
            <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="relative min-h-[200px] min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm uppercase text-gray-800 font-semibold min-w-[150px]"
                      >
                        Thumbnail
                      </th>
                      <th
                        scope="col"
                        className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm uppercase text-gray-800 font-semibold min-w-[200px]"
                      >
                        name
                      </th>
                      <th
                        scope="col"
                        className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm uppercase text-gray-800 font-semibold min-w-[100px]"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm uppercase text-gray-800 font-semibold min-w-[150px]"
                      >
                        created at
                      </th>
                      <th
                        scope="col"
                        className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm uppercase text-gray-800 font-semibold min-w-[100px]"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr className="absolute top-16 left-[50%] translate-x-[-50%]">
                        <td className="w-full">
                          <Image
                            width={100}
                            height={100}
                            className="h-24 w-24"
                            src="/assets/double-ring-loader.svg"
                            alt="loader"
                          />
                        </td>
                      </tr>
                    ) : adminProducts?.length === 0 ? (
                      <tr className="absolute top-24 left-[50%] translate-x-[-50%]">
                        <td className="w-full text-center text-lg font-semibold">
                          {"You Haven't created any product yet. 😝"}
                        </td>
                      </tr>
                    ) : (
                      adminProducts?.map((product, index) => (
                        <tr key={`admin_product_${index}`}>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 cursor-pointer">
                                <Image
                                  width={100}
                                  height={100}
                                  src={product?.thumbnail}
                                  alt="image"
                                  className="mx-auto aspect-square w-10 rounded-lg object-cover transition-opacity duration-150 hover:opacity-70"
                                />
                              </div>
                              <div className="ml-3 cursor-pointer"></div>
                            </div>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <Link href={`/product/${product?.slug}`}>
                              <p className="max-w-[200px] truncate text-gray-900 transition-colors duration-150 hover:text-blue-400">
                                {product?.name}
                              </p>
                            </Link>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {product?.category}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {new Date(product.updatedAt).toLocaleDateString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}{" "}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm capitalize">
                            <div className="relative flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleUpdateProduct(product.slug)
                                }
                                className="disabled:cursor-wait disabled:opacity-60 flex items-center gap-2 text-black cursor-pointer hover:bg-blue-500 rounded-md border-2 border-blue-500 p-2 hover:text-white"
                              >
                                <FaPen />{" "}
                                <span className="text-[12px] font-semibold">
                                  Edit
                                </span>
                              </button>
                              <div
                                onClick={() => setCancelConf(product.slug)}
                                className="flex items-center gap-2 text-red-500 cursor-pointer hover:bg-red-500 rounded-md border-2 border-red-500 p-2 hover:text-white"
                              >
                                <AiOutlineDelete />{" "}
                                <span className="text-[12px] font-semibold">
                                  Delete
                                </span>
                              </div>
                              <ConfModal
                                setCancelConf={setCancelConf}
                                cancelConf={cancelConf}
                                index={product.slug}
                                deleteProductMutate={deleteProductMutate}
                                isDeletingProduct={isDeletingProduct}
                                productSlug={product?.slug}
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
