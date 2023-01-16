import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import * as React from "react";
import toast from "react-hot-toast";

import Button from "@/components/buttons/Button";
import SEO from "@/components/SEO";
import Typography from "@/components/typography/Typography";
import useLoadingToast from "@/hooks/toast/useLoadingToast";
import useMutationToast from "@/hooks/toast/useMutationToast";
import useQueryToast from "@/hooks/toast/useQueryToast";
import api from "@/lib/api";
import { ApiError, ApiReturn } from "@/types/api";

type User = {
  id: number;
  name: string;
  token: string;
};

type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

export default function SandboxPage() {
  const isLoading = useLoadingToast();

  const { data: mutationData, mutate } = useMutationToast<
    ApiReturn<LoginResponse>,
    LoginData
  >(useMutation((data) => api.post("/login", data).then((res) => res.data)));

  const { data: queryData } = useQueryToast(
    useQuery<ApiReturn<User>, AxiosError<ApiError>>(["/me"])
  );

  return (
    <>
      <SEO title="Sandbox" />

      <section className="bg-gray-100">
        <div className="layout flex min-h-screen flex-col items-start space-y-3 py-20">
          <Button onClick={() => toast.success("Hello!")}>Open Toast</Button>
          <Button
            isLoading={isLoading}
            onClick={() =>
              mutate({ email: "admin@mail.com", password: "admin" })
            }
          >
            Submit
          </Button>
          <Typography as="h3" variant="h3">
            Query:
          </Typography>
          {queryData && <pre>{JSON.stringify(queryData, null, 2)}</pre>}
          <Typography as="h3" variant="h3">
            Mutation:
          </Typography>
          {mutationData && <pre>{JSON.stringify(mutationData, null, 2)}</pre>}
        </div>
      </section>
    </>
  );
}
