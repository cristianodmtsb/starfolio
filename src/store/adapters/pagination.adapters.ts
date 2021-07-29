import { Pagination } from '../types';

export const adaptUrlByPage = (url: string, page: number): string => {
  if (isFirstPagination(page)) {
    return url;
  }

  return `${url}?page=${page}`;
};

export const adaptPagination = (
  page: number,
  initialStatePagination: Pagination,
  statePagination: Pagination
): Pagination => {
  if (isFirstPagination(page)) {
    return initialStatePagination;
  }

  return statePagination;
};

export const adaptDataByPage = <T>(
  page: number,
  initialPageData: T,
  accumulatedData: T,
  firstLoad?: boolean
): T => {
  if (firstLoad && (!page || page <= 1)) {
    return initialPageData;
  }

  if (isFirstPagination(page)) {
    return initialPageData;
  }

  return accumulatedData;
};

const isFirstPagination = (page: number): boolean => {
  return !page || page < 1;
};
