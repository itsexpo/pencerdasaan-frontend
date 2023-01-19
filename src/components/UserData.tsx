import { Data } from "@/types/pencerdasan/data";

export default function UserInformation(userData: Data) {
  return (
    <>
      <div className="flex flex-col border-2 border-black w-96 rounded-xl px-4 py-2">
        <p>Name: {userData.name}</p>
        <p>Username: {userData.username}</p>
        <p>
          Address:{" "}
          {userData.address.street +
            " " +
            userData.address.suite +
            " " +
            userData.address.city}
        </p>
        <p>Phone: {userData.phone} </p>
      </div>
    </>
  );
}
