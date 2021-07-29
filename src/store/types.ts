export type StateError = {
  hasError?: boolean;
  msg?: string;
  status?: number;
};

export type Pagination = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
};
