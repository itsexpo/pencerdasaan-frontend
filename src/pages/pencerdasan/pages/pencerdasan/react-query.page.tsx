import { useEffect, useState } from "react";
import axios from "axios";

import UserData from "@/components/UserData";
import { Data } from "@/types/pencerdasan/data";

const useFetchData = () => {
    const [data, setData] = useState<Data[]>();
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      setIsLoading(true);
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }, []);
  
    return { data, isLoading };
  };

const useAddData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const addData = (user: User) => {
        setIsLoading(true);
        axios
          .post("https://itsexpo.robby.pw/api/login_user", user)
          .then((response) => {
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
    }
    return { addData, isLoading };
  };

export default function ReactQuery() {
  const { data, isLoading } = useFetchData();
  const { addData, isAdding } = useAddData();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="flex flex-col items-center mb-12">
      <h1 className="text-3xl self-start">React Query</h1>
      <h2 className="text-3xl">useFetchData</h2>
      <div className="flex flex-col items-center w-full gap-2 mt-2">
        {data?.map((user) => {
          return <UserData key={user.id} {...user}></UserData>;
        })}
      </div>
      <h2 className="text-3xl mt-8">useAddData</h2>
      <button
        onClick={() => addData({ email: "admin@itsexpo.com", password: "1234567" })
      }
      className="mt-2 border-2 text-xl px-4 py-1 rounded-lg"
      >
      Login
      </button>
      {isAdding && <h1>Adding data...</h1>}
      </div>
      );
      }