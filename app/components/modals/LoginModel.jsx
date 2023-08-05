// @ts-nocheck
"use client";

import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../inputs/Heading";
import Button from "../inputs/Button";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { userActions } from "../../store/reducers/user";
import useLoginModel from "../../hooks/useLoginModal";
import useRegisterModel from "../../hooks/useRegisterModal";
import { loginUser } from "../../services/user";
import { counterActions } from "@/app/store/reducers/counter";

const LoginModal = () => {
  const loginModal = useLoginModel();
  const registerModal = useRegisterModel();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data?.user));
      dispatch(counterActions.cartLen(data?.user?.cart));
      dispatch(counterActions.wishlistLen(data?.user?.wishlist));
      loginModal.onClose();
      toast.success("Login Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (body) => {
    const { email, password } = body;
    mutate({ email, password });
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div
        className="
      text-neutral-500 text-center mt-4 font-light"
      >
        <p>
          New on Nyke?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
