// @ts-nocheck
"use client";

import Modal from "./Modal";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  updateProduct,
  uploadShowImages,
  uploadThumbnail,
} from "@/app/services/product";
import Categories from "../admin/Categories";
import Price from "../admin/Price";
import DescriptionSize from "../admin/DescriptionSize";
import Images from "../admin/Images";
import Thumbnail from "../admin/Thumbnail";
import NameSubtitle from "../admin/NameSubtitle";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import useUpdateProductModal from "@/app/hooks/useUpdateProductModal";
import { clearProduct } from "@/app/store/actions/product";
import { useRouter } from "next/navigation";
import { userActions } from "@/app/store/reducers/user";

const STEPS = {
  NAME_SUBTITLE: 0,
  THUMBNAIL: 1,
  IMAGES: 2,
  DESCRIPTION_SIZE: 3,
  PRICE: 4,
  CATEGORIES: 5,
};

const categoriesData = ["Jordan", "Running", "Sneakers", "Football"];

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const updateModal = useUpdateProductModal();
  const { productInfo } = useSelector((state) => state.product);
  const [step, setStep] = useState(STEPS.NAME_SUBTITLE);
  const [thumbnailPic, setThumbnailPic] = useState("");
  const [demoPictures, setDemoPictures] = useState([]);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: productInfo?.name,
      subtitle: productInfo?.subtitle,
      price: productInfo?.price,
      description: productInfo?.description,
      original_price: productInfo?.original_price,
      size: JSON.stringify(productInfo?.size),
      images: productInfo?.images,
      thumbnail: productInfo?.thumbnail,
      categories: productInfo?.categories,
    },
  });

  useEffect(()=>{
    reset({
      name: productInfo?.name,
      subtitle: productInfo?.subtitle,
      price: productInfo?.price,
      description: productInfo?.description,
      original_price: productInfo?.original_price,
      size: JSON.stringify(productInfo?.size),
      images: productInfo?.images,
      thumbnail: productInfo?.thumbnail,
      categories: productInfo?.categories,
    })
  }, [productInfo, reset])

  const name = watch("name");
  const subtitle = watch("subtitle");
  const price = watch("price");
  const description = watch("description");
  const original_price = watch("original_price");
  const size = watch("size");
  const images = watch("images");
  const thumbnail = watch("thumbnail");
  const categories = watch("categories");

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (formData) => uploadThumbnail({ formData: formData }),
    onSuccess: (data) => {
      setThumbnailPic(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const formData = new FormData();
        formData.append("thumbnail", file);
        mutate(formData);
      }
    };
    getImage();
  }, [mutate, file]);

  const { mutate: mutateImages, isLoading: imagesLoading } = useMutation({
    mutationFn: (formData) => uploadShowImages({ formData: formData }),
    onSuccess: (data) => {
      setDemoPictures(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    const getImage = async () => {
      if (files.length) {
        const formData = new FormData();
        for (var x = 0; x < files.length; x++) {
          formData.append("images", files[x]);
        }
        mutateImages(formData);
      }
    };
    getImage();
  }, [mutateImages, files]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  useEffect(() => {
    if (productInfo) {
      setSelectedCategories(productInfo?.categories);
      setThumbnailPic(productInfo?.thumbnail);
      setDemoPictures(productInfo?.images);
    }
  }, [productInfo]);

  useEffect(() => {
    setCustomValue("categories", selectedCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories]);

  useEffect(() => {
    setCustomValue("thumbnail", thumbnailPic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbnailPic]);

  useEffect(() => {
    setCustomValue("images", [...demoPictures]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demoPictures]);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const { mutate: mutateUpdate, isLoading: isUpdating } = useMutation({
    mutationFn: (formData) =>
      updateProduct({ formData: formData, slug: productInfo?.slug }),
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data?.user))
      toast.success(data?.message);
      updateModal.onClose();
      reset({
        name: "",
        subtitle: "",
        price: null,
        description: "",
        original_price: null,
        size: "",
        images: [],
        thumbnail: "",
        categories: [],
      });
      setStep(STEPS.NAME_SUBTITLE);
      setSelectedCategories([]);
      dispatch(clearProduct);
    },
    onError: (error) => {
      console.log(error);
      toast.success(error?.message);
    },
  });

  const onUpdate = (data) => {
    if (step !== STEPS.CATEGORIES) {
      return onNext();
    }
    mutateUpdate(data);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.CATEGORIES) {
      return "Update";
    }
    return "Next";
  }, [step]);

  const secondryActionLabel = useMemo(() => {
    if (step === STEPS.NAME_SUBTITLE) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <NameSubtitle isLoading={isLoading} register={register} errors={errors} />
  );

  if (step === STEPS.THUMBNAIL) {
    bodyContent = (
      <Thumbnail
        thumbnailPic={thumbnailPic}
        isLoading={isLoading}
        setFile={setFile}
      />
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <Images
        demoPictures={demoPictures}
        setFiles={setFiles}
        imagesLoading={imagesLoading}
      />
    );
  }

  if (step === STEPS.DESCRIPTION_SIZE) {
    bodyContent = (
      <DescriptionSize
        isLoading={isLoading}
        register={register}
        errors={errors}
      />
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <Price isLoading={isLoading} register={register} errors={errors} />
    );
  }

  if (step === STEPS.CATEGORIES) {
    bodyContent = (
      <Categories
        categoriesData={categoriesData}
        selectedCategories={selectedCategories}
        handleCategoryClick={handleCategoryClick}
      />
    );
  }

  return (
    <Modal
      disabled={isUpdating}
      title="Update Product"
      onClose={updateModal.onClose}
      isOpen={updateModal.isOpen}
      onSubmit={handleSubmit(onUpdate)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondryActionLabel}
      secondaryAction={step === STEPS.NAME_SUBTITLE ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default UpdateProduct;
