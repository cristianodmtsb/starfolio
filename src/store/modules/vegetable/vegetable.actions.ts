import compose from 'src/utils/functions/compose';
import { HttpFetch } from 'src/services';
import { Token } from 'src/services/types/Token';
import * as Types from './vegetable.types';
import * as api from './vegetable.api';

export const getVegetableDetailsRequest = (
  page: number
): Types.GetVegetableDetailsRequest => ({
  type: Types.GET_VEGETABLE_DETAILS_REQUEST,
  payload: page,
});

export const getVegetableDetailsSuccess = (data): Types.GetVegetableDetailsSuccess => ({
  type: Types.GET_VEGETABLE_DETAILS_SUCCESS,
  payload: data,
});

export const getVegetableDetailsFailure = (
  params: number
): Types.GetVegetableDetailsFailure => ({
  type: Types.GET_VEGETABLE_DETAILS_FAILURE,
  payload: params,
});

export const getVegetableDetailsDispatch = (
  token: Token,
  powerPlaceId: string | number,
  page: number
) => {
  return async (dispatch) => {
    try {
      dispatch(getVegetableDetailsRequest(page));

      const response = await HttpFetch(
        api.getVegetableDetailsQuery(token, powerPlaceId)
      );

      const { data, status, extraData, pagination } = response;

      if (status === 0) {
        compose(
          dispatch,
          getVegetableDetailsSuccess
        )({ data, extraData, pagination });
      } else {
        dispatch(getVegetableDetailsFailure(status));
      }
    } catch (error) {
      dispatch(getVegetableDetailsFailure(error.status));
    }
  };
};

export const getVegetablesRequest = (
  page?: number
): Types.GetVegetablesRequest => ({
  type: Types.GET_VEGETABLES_REQUEST,
  payload: page,
});

export const getVegetablesSuccess = (data): Types.GetVegetablesSuccess => ({
  type: Types.GET_VEGETABLES_SUCCESS,
  payload: data,
});

export const getVegetablesFailure = (
  params: number
): Types.GetVegetablesFailure => ({
  type: Types.GET_VEGETABLES_FAILURE,
  payload: params,
});

export const getVegetablesDispatch = (token: Token, page?: number) => {
  return async (dispatch) => {
    try {
      dispatch(getVegetablesRequest(page));

      const { data, status, pagination } = await compose(
        HttpFetch,
        api.getVegetablesQuery
      )(token, page);

      if (status === 0) {
        dispatch(getVegetablesSuccess({ data, pagination }));
      } else {
        dispatch(getVegetablesFailure(status));
      }
    } catch (error) {
      dispatch(getVegetablesFailure(error.status));
    }
  };
};
