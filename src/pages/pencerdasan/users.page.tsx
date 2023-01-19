import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import withSearch, {
  WithSearchProps,
} from "@/components/hoc/pencerdasan/withSearch";
import UserCard from "@/components/pencerdasan/UserCard";
import { User } from "@/types/pencerdasan/user";

export default function UsersPage() {
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

  const filterUsers = (searchTerm: string) => {
    searchTerm = searchTerm.toLowerCase();

    return users?.data.filter((user) => {
      const str = `${user.name} ${user.username} ${user.email}`.toLowerCase();
      return str.indexOf(searchTerm) >= 0;
    });
  };

  const UserListWithSearch = withSearch(UsersList, filterUsers);

  return (
    <div className="flex flex-col justify-start items-center">
      <div className="flex flex-col justify-start items-center w-7/12 p-2">
        <UserListWithSearch />
      </div>
    </div>
  );
}

function UsersList(props: WithSearchProps) {
  const { data } = props;
  return (
    <ul className="list-none flex flex-col justify-center items-stretch w-full">
      {data?.map((user) => (
        <li key={user.id}>
          <UserCard {...user} />
        </li>
      ))}
    </ul>
  );
}
