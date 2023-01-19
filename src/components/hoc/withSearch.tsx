import { useState } from "react";

import { Data } from "@/types/pencerdasan/data";

type UserListProps = {
  classNames?: string;
  users?: Data[];
};

export default function withSearch<T extends UserListProps = UserListProps>(
  Component: React.ComponentType<T>,
  filter: (searchTerm: string) => Data[] | undefined
) {
  const ComponentWithSearch = (props: Omit<T, keyof UserListProps>) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = filter(searchTerm);
    return (
      <div className="flex flex-col">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          type="text"
          placeholder="Search"
          className="mt-5 px-8 py-4 self-center w-96 rounded-lg"
        />
        <Component
          {...(props as T)}
          classNames="flex flex-col items-center w-full gap-2 mt-2"
          users={filteredUsers}
        />
      </div>
    );
  };

  return ComponentWithSearch;
}
