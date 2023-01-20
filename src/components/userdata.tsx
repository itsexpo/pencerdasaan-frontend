import { Data } from "@/types/pencerdasan/data";

const UserData = ({ userData }: { userData: Data }) => {
const { name, username, address, phone } = userData;
const { street, suite, city } = address;
return (
<div className="border-2 border-black w-96 rounded-xl px-4 py-2">
<div className="font-bold">Name: {name}</div>
<div className="font-bold">Username: {username}</div>
<div className="font-bold">Address:</div>
<div>{street} {suite}, {city}</div>
<div className="font-bold">Phone: {phone}</div>
</div>
);
};

export default UserData;