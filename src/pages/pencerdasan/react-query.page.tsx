import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import UserList from "@/components/UserList";
import { Data } from "@/types/pencerdasan/data";

export const getUserData = () => {
  return axios.get("https://jsonplaceholder.typicode.com/users");
};

const addUserData = (data: { email: string; password: string }) => {
  return axios.post("https://itsexpo.robby.pw/api/login_user", data);
};

export default function ReactQuery() {
  const { isLoading, data: users } = useQuery<{ data: Data[] }>({
    queryKey: ["user"],
    queryFn: getUserData,
  });

  const { mutate } = useMutation({
    mutationFn: addUserData,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col items-center mb-12">
      <h1 className="text-3xl self-start">React Query</h1>
      <h2 className="text-3xl">useQuery</h2>
      <UserList
        classNames="flex flex-col items-center w-full gap-2 mt-2"
        users={users?.data}
      />
      <h2 className="text-3xl mt-8">useMutation</h2>
      <button
        onClick={() =>
          mutate({ email: "admin@itsexpo.com", password: "1234567" })
        }
        className="mt-2 border-2 text-xl px-4 py-1 rounded-lg"
      >
        Login
      </button>
    </div>
  );
}
