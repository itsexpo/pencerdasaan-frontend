import { useState } from "react";

import { User } from "@/types/pencerdasan/user";

export interface WithSearchProps {
  data: Array<User> | undefined;
}

export default function withSearch<T extends WithSearchProps = WithSearchProps>(
  Component: React.ComponentType<T>,
  filter: (searchTerm: string) => Array<User> | undefined
) {
  const displayName = Component.displayName || Component.name || "Component";

  const ComponentWithSearch = (props: Omit<T, keyof WithSearchProps>) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
      <div>
        <input
          type="text"
          onChange={(event) => setSearchTerm(event.target.value)}
          value={searchTerm}
          placeholder="Search"
          className="w-full my-2"
        />
        <Component {...{ data: filter(searchTerm) }} {...(props as T)} />
      </div>
    );
  };

  ComponentWithSearch.displayName = `withSearch(${displayName})`;

  return ComponentWithSearch;
}
