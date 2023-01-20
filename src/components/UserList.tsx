import UserData from "@/components/UserData";
import { Data } from "@/types/pencerdasan/data";

type UserListProps = {
  classNames?: string;
  users?: Data[];
};

const UserListData = ({ users }: { users?: Data[] }) => {
  return (
    <>
      {users?.map((user) => {
        return <UserData key={user.id} {...user}></UserData>;
      })}
    </>
  );
};

export default function UserList({ classNames, users }: UserListProps) {
  return <div className={classNames}>{<UserListData users={users} />}</div>;
}
