import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import UserData from "@/components/UserData";
import { Data } from "@/types/pencerdasan/data";

type Users = {
  data: Data[];
};

type User = {
  email: string;
  password: string;
};

const fetchUserData = () => {
  return axios.get("https://jsonplaceholder.typicode.com/users");
};

const addUserData = (data: User) => {
  return axios.post("https://itsexpo.robby.pw/api/login_user", data);
};

export default function ReactQuery() {
  const { isLoading, data: users } = useQuery<Users>({
    queryKey: ["user"],
    queryFn: fetchUserData,
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
      <div className="flex flex-col items-center w-full gap-2 mt-2">
        {users?.data.map((user) => {
          return <UserData key={user.id} {...user}></UserData>;
        })}
      </div>
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
