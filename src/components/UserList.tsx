import UserData from "@/components/UserData";
import { Data } from "@/types/pencerdasan/data";

type UserListProps = {
  classNames?: string;
  users?: Data[];
};

export default function UserList({ classNames, users }: UserListProps) {
  return (
    <div className={classNames}>
      {users?.map((user) => {
        return <UserData key={user.id} {...user}></UserData>;
      })}
    </div>
  );
}
