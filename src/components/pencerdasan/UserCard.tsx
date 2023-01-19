import { User } from "@/types/pencerdasan/user";

export default function UserCard(user: User) {
  return (
    <div className="flex flex-col justify-start items-start border-2 border-black p-2 my-2 w-full">
      <h1 className="text-2xl">
        <span className="font-bold">{user.username}</span> | {user.name}
      </h1>
      <p className="mt-2">{user.email}</p>
      <p>{user.website}</p>
      <p>{user.phone}</p>
    </div>
  );
}
