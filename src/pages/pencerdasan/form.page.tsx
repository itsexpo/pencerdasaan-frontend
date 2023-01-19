import { useForm } from "react-hook-form";

type LoginForm = {
  username: string;
  password: string;
};

export default function FormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const onSubmit = (data: LoginForm) => console.log(data);

  return (
    <div className="flex flex-col justify-start items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-72 h-screen"
      >
        <h1 className="font-bold text-4xl mb-4">Sign Up</h1>
        <label htmlFor="username" className="text-left w-full">
          Username
        </label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: true,
            minLength: 3,
            maxLength: 30,
          })}
          placeholder="Enter Your Username"
          className="w-full"
        />

        {errors.username?.type === "required" && (
          <span className="text-left">This is required!</span>
        )}
        {errors.username?.type === "minLength" && (
          <span className="text-left">
            Username must consists at least 3 characters!
          </span>
        )}
        {errors.username?.type === "maxLength" && (
          <span className="text-left">
            Username consists of 30 characters maximum!
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
            Password must consists at least 3 characters!
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
      </form>
    </div>
  );
}
