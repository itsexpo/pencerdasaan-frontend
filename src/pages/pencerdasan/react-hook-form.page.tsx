import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  userName: string;
};

export default function ReactHookForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const [data, setData] = useState<FormData>();

  const onSubmit = handleSubmit((data) => {
    setData(data);
  });

  return (
    <>
      <h1 className="text-3xl">React Hook Form</h1>
      <div className="flex flex-col items-center">
        <form className="flex flex-col" onSubmit={onSubmit}>
          <label htmlFor="userName" className="font-bold">
            Username
          </label>
          <input
            {...register("userName", {
              required: true,
              maxLength: 20,
              minLength: 5,
            })}
            type="text"
            name="userName"
            id="userName"
            placeholder="Enter your username..."
            className="border-2 w-80 rounded-md"
          />
          {errors.userName?.type === "required" && (
            <p className="text-red-500">Username is required.</p>
          )}
          {errors.userName?.type === "minLength" && (
            <p className="text-red-500">Username is too short.</p>
          )}
          {errors.userName?.type === "maxLength" && (
            <p className="text-red-500">Username is too long.</p>
          )}
          <input
            className="cursor-pointer border-2 mt-2 px-4 py-2 border-black w-24 self-center rounded-lg"
            type="submit"
          />
        </form>
        <h2>
          Your username:{" "}
          <span className="font-bold text-xl">{data?.userName}</span>
        </h2>
      </div>
    </>
  );
}
