import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";

import UserCard from "@/components/pencerdasan/UserCard";
import { User } from "@/types/pencerdasan/user";

const queryClient = new QueryClient();

export default function UsersPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersList />
    </QueryClientProvider>
  );
}

function UsersList() {
  const {
    isLoading,
    error,
    data: users,
  } = useQuery<{ data: Array<User> }>({
    queryKey: ["usersData"],
    queryFn: () => axios.get("https://jsonplaceholder.typicode.com/users"),
  });

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error</>;

  return (
    <div className="flex flex-col justify-start items-center">
      <ul className="list-none flex flex-col justify-center items-stretch w-2/5">
        {users?.data.map((user) => (
          <li key={user.id}>
            <UserCard {...user} />
          </li>
        ))}
      </ul>
    </div>
  );
}
