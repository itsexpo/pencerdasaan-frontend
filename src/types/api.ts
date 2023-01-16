export type ApiReturn<T> = {
  status: boolean;
  message: string;
  data: T;
};

export type ApiError = {
  message: string;
};

export type UninterceptedApiError = {
  message: string | Record<string, string[]>;
};

export interface PaginatedApiResponse<DataType> {
  code: number;
  status: string;
  data: DataType;
  meta: {
    last_page: number;
    total: number;
  };
}
