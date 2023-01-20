import { useQuery } from "@tanstack/react-query";

import withSearch from "@/components/hoc/withSearch";
import UserList from "@/components/UserList";
import { getUserData } from "@/lib/user";
import { Data } from "@/types/pencerdasan/data";

export default function HOCSearch() {
  const { isLoading, data: users } = useQuery<{ data: Data[] }>({
    queryKey: ["user"],
    queryFn: getUserData,
  });

  const filterUsers = (searchTerm: string) => {
    searchTerm = searchTerm.toUpperCase();
    return users?.data.filter((user: Data) => {
      const str = `${user.name}`.toUpperCase();
      return str.indexOf(searchTerm) >= 0;
    });
  };

  const FilteredUserList = withSearch(UserList, filterUsers);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return <FilteredUserList />;
}