import { useRouter } from "next/router";
import * as React from "react";
import toast from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";

import api from "@/lib/api";
import { getToken, removeToken } from "@/lib/cookies";
import useAuthStore from "@/store/useAuthStore";
import { ApiReturn } from "@/types/api";
import { PermissionList } from "@/types/entities/permission-list";
import { LoginRespond, User } from "@/types/entities/user";

export interface WithAuthProps {
  user: User;
}

const hasPermission = (user: User | null, permission: PermissionList) => {
  return permission.every((p) => user?.permissions?.includes(p));
};

/**
 * Add role-based access control to a component
 *
 * @see https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
 * @see https://github.com/mxthevs/nextjs-auth/blob/main/src/components/withAuth.tsx
 */

const HOME_ROUTE = "/dashboard";
const LOGIN_ROUTE = "/login";

export default function withAuth<T extends WithAuthProps = WithAuthProps>(
  Component: React.ComponentType<T>,
  routePermission: "auth" | PermissionList
) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const router = useRouter();
    const { query } = router;

    //#region  //*=========== STORE ===========
    const isAuthenticated = useAuthStore.useIsAuthenticated();
    const isLoading = useAuthStore.useIsLoading();
    const login = useAuthStore.useLogin();
    const logout = useAuthStore.useLogout();
    const stopLoading = useAuthStore.useStopLoading();
    const user = useAuthStore.useUser();
    //#endregion  //*======== STORE ===========

    // Check if user is authenticated
    const checkAuth = React.useCallback(() => {
      const token = getToken();
      if (!token) {
        isAuthenticated && logout();
        stopLoading();
        return;
      }
      const loadUser = async () => {
        try {
          const res = await api.post<ApiReturn<LoginRespond>>("/me");
          const permissions = res.data.data.permission;

          login({
            name: res.data.data.name,
            email: res.data.data.email,
            role_id: permissions.role_id,
            role: permissions.role,
            token: token,
            permissions: permissions.routes,
          });
        } catch (err) {
          removeToken();
        } finally {
          stopLoading();
        }
      };
      if (!isAuthenticated) {
        loadUser();
      }
    }, [isAuthenticated, login, logout, stopLoading]);

    React.useEffect(() => {
      // ComponentWillMount
      // run checkAuth every page visit
      checkAuth();

      // run checkAuth every focus changes
      window.addEventListener("focus", checkAuth);
      return () => {
        window.removeEventListener("focus", checkAuth);
      };
    }, [checkAuth]);

    React.useEffect(() => {
      // ComponentDidMount
      if (!isLoading) {
        if (isAuthenticated) {
          // Prevent authenticated user from accessing auth or other role pages
          if (
            routePermission === "auth" ||
            !hasPermission(user, routePermission)
          ) {
            console.log(query?.redirect);
            if (query?.redirect) {
              router.replace(query.redirect as string);
            } else {
              if (routePermission !== "auth") {
                toast.error("Anda tidak memiliki akses ke halaman ini", {
                  id: "unauthorized",
                });
              }
              // router.replace(HOME_ROUTE);
            }
          }
        } else {
          // Prevent unauthenticated user from accessing protected pages
          if (routePermission !== "auth") {
            router.replace(
              `${LOGIN_ROUTE}?redirect=${router.asPath}`,
              `${LOGIN_ROUTE}`
            );
          }
        }
      }
    }, [isAuthenticated, isLoading, query, router, user]);

    console.log("isAuthenticated", isAuthenticated, "isLoading", isLoading);
    if (
      // If unauthenticated user want to access protected pages
      ((isLoading || !isAuthenticated) && routePermission !== "auth") ||
      ((isLoading || isAuthenticated) &&
        routePermission !== "auth" &&
        !hasPermission(user, routePermission))
    ) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center text-gray-800">
          <ImSpinner8 className="mb-4 animate-spin text-4xl" />
          <p>Loading...</p>
        </div>
      );
    }

    return <Component {...(props as T)} user={user} />;
  };

  return ComponentWithAuth;
}
