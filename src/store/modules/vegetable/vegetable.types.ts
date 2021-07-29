import { Pagination, StateError } from 'src/store/types';

export const scope = 'vegetable';

export const GET_VEGETABLE_DETAILS_REQUEST = `@${scope}:GET_VEGETABLE_DETAILS_REQUEST`;
export const GET_VEGETABLE_DETAILS_SUCCESS = `@${scope}:GET_VEGETABLE_DETAILS_SUCCESS`;
export const GET_VEGETABLE_DETAILS_FAILURE = `@${scope}:GET_VEGETABLE_DETAILS_FAILURE`;

export const GET_VEGETABLES_REQUEST = `@${scope}:GET_VEGETABLES_REQUEST`;
export const GET_VEGETABLES_SUCCESS = `@${scope}:GET_VEGETABLES_SUCCESS`;
export const GET_VEGETABLES_FAILURE = `@${scope}:GET_VEGETABLES_FAILURE`;

export type Vegetable = {
  id?: string;
  title: string;
};

export type VegetableState = {
  error: StateError;
  isLoadingVegetables: boolean;
  vegetables: Vegetable[];
  vegetableDetails: Vegetable[];
  pagination: Pagination;
};

export interface GetVegetableDetailsRequest {
  type: typeof GET_VEGETABLE_DETAILS_REQUEST;
  payload: number;
}

export interface GetVegetableDetailsSuccess {
  type: typeof GET_VEGETABLE_DETAILS_SUCCESS;
  payload: {
    data: Vegetable[];
    pagination: Pagination;
  };
}

export interface GetVegetableDetailsFailure {
  type: typeof GET_VEGETABLE_DETAILS_FAILURE;
  payload: number;
}

export interface GetVegetablesRequest {
  type: typeof GET_VEGETABLES_REQUEST;
  payload?: number;
}

export interface GetVegetablesSuccess {
  type: typeof GET_VEGETABLES_SUCCESS;
  payload: { data: Vegetable[]; pagination: Pagination };
}

export interface GetVegetablesFailure {
  type: typeof GET_VEGETABLES_FAILURE;
  payload: number;
}

export type VegetableActionsTypes =
  | GetVegetableDetailsRequest
  | GetVegetableDetailsSuccess
  | GetVegetableDetailsFailure
  | GetVegetablesRequest
  | GetVegetablesSuccess
  | GetVegetablesFailure;
