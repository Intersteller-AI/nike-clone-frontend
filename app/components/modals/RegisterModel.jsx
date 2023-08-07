"use client";

import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../inputs/Heading";
import Input from "../inputs/Input";
import useRegisterModel from "../../hooks/useRegisterModal";
import useLoginModel from "../../hooks/useLoginModal";
import { registerUser } from "../../services/user";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { userActions } from '../../store/reducers/user'
import { useMutation } from '@tanstack/react-query'


const RegisterModal = () => {
  const registerModal = useRegisterModel();
  const loginModal = useLoginModel();
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) =>
      registerUser({ name, email, password }),
    onSuccess: (data) => {
      Cookies.set("user", JSON.stringify(data?.user), { expires: 7 });
      dispatch(userActions.setUserInfo(data?.user));
      registerModal.onClose();
      toast.success("Registered Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (body) => {
    const { name, email, password } = body;

    mutate({ name, email, password });
  };

  const onToggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
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
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an Account?</div>
          <div
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      loadingMessage={"Registering User"}
      isOpen={registerModal.isOpen}
      title="Sign up"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
