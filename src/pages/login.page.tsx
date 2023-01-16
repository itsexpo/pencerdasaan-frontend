import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";

import Button from "@/components/buttons/Button";
import Input from "@/components/forms/Input";
import withAuth from "@/components/hoc/withAuth";
import useMutationToast from "@/hooks/toast/useMutationToast";
import Layout from "@/layouts/Layout";
import api from "@/lib/api";
import { setToken } from "@/lib/cookies";
import useAuthStore from "@/store/useAuthStore";
import { ApiReturn } from "@/types/api";
import { Login } from "@/types/entities/login";
import { LoginRespond } from "@/types/entities/user";

export default withAuth(LoginPage, "auth");

type LoginForm = {
  email: string;
  password: string;
};

function LoginPage() {
  const methods = useForm<Login>();
  const { handleSubmit } = methods;
  const login = useAuthStore.useLogin();

  const { mutate } = useMutationToast<void, LoginForm>(
    useMutation((data) => {
      let tempToken: string;

      return api
        .post("/login_user", data)
        .then((res) => {
          const { token } = res.data.data;
          tempToken = token;
          setToken(token);

          return api.post<ApiReturn<LoginRespond>>("/me");
        })
        .then((user) => {
          const permissions = user.data.data.permission;

          login({
            name: user.data.data.name,
            email: user.data.data.email,
            role_id: permissions.role_id,
            role: permissions.role,
            permissions: permissions.routes,
            token: tempToken,
          });
        });
    })
  );

  const onSubmit = (data: LoginForm) => {
    mutate(data);

    return;
  };
  return (
    <Layout>
      <main>
        <section>
          <div className="layout h-screen flex justify-center items-center">
            <div className="w-3/5 h-5/6 flex flex-col space-y-3 justify-center items-center">
              <h1 className="text-5xl">Login</h1>
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col justify-center items-center"
                >
                  <Input
                    id="email"
                    label="E-mail"
                    type="email"
                    placeholder="Masukkan Email"
                    validation={{
                      required: true,
                    }}
                  />
                  <Input
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Masukkan Password"
                    validation={{
                      required: true,
                    }}
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    className="mt-4 flex h-14 justify-center"
                  >
                    Masuk
                  </Button>
                </form>
              </FormProvider>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
