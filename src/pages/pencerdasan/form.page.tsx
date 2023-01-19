import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

type ErrorMessage = {
  success: boolean;
  message: string;
  code: number;
};

export default function FormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const [response, setResponse] = useState("");

  const { mutate } = useMutation({
    mutationFn: (newUser: LoginForm) => {
      return axios.post("https://itsexpo.robby.pw/api/login_user", newUser);
    },
    onSuccess: (data) => {
      setResponse(data?.data.message);
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as ErrorMessage;
      setResponse(data.message);
    },
  });

  const onSubmit = (data: LoginForm) => mutate(data);

  return (
    <div className="flex flex-col justify-start items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-72 h-screen"
      >
        <h1 className="font-bold text-4xl mb-4">Sign Up</h1>
        <label htmlFor="email" className="text-left w-full">
          Email
        </label>
        <input
          type="text"
          id="email"
          {...register("email", {
            required: true,
            minLength: 3,
            maxLength: 30,
          })}
          placeholder="Enter Your email"
          className="w-full"
        />

        {errors.email?.type === "required" && (
          <span className="text-left">This is required!</span>
        )}
        {errors.email?.type === "minLength" && (
          <span className="text-left">
            email must consists at least 3 characters!
          </span>
        )}
        {errors.email?.type === "maxLength" && (
          <span className="text-left">
            email consists of 30 characters maximum!
          </span>
        )}

        <label htmlFor="password" className="text-left w-full mt-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: true,
            minLength: 8,
            maxLength: 30,
          })}
          placeholder="Enter Your Password"
          className="w-full"
        />

        {errors.password?.type === "required" && (
          <span className="text-left">This is required!</span>
        )}
        {errors.password?.type === "minLength" && (
          <span className="text-left">
            Password must consists at least 8 characters!
          </span>
        )}
        {errors.password?.type === "maxLength" && (
          <span className="text-left">
            Password consists of 30 characters maximum!
          </span>
        )}

        <button
          type="submit"
          className="border-2 border-gray-500 rounded-lg w-fit py-2 px-6 mt-4"
        >
          Sign Up
        </button>

        <span className="mt-2">{response}</span>
      </form>
    </div>
  );
}
