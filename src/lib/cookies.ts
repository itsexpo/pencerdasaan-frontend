import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getToken = (): string => {
  return cookies.get("@itsexpo/token");
};

export const setToken = (token: string) => {
  cookies.set("@itsexpo/token", token, {
    path: "/",
  });
};

export const removeToken = () => {
  cookies.remove("@itsexpo/token", {
    path: "/",
  });
};
