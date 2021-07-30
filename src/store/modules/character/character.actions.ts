import compose from 'src/utils/functions/compose';
import { HttpFetch } from 'src/services';
import { Token } from 'src/services/types/Token';
import * as Types from './character.types';
import * as api from './character.api';

export const getCharacterDetailsRequest = (
  page: number
): Types.GetCharacterDetailsRequest => ({
  type: Types.GET_CHARACTER_DETAILS_REQUEST,
  payload: page,
});

export const getCharacterDetailsSuccess = (data): Types.GetCharacterDetailsSuccess => ({
  type: Types.GET_CHARACTER_DETAILS_SUCCESS,
  payload: data,
});

export const getCharacterDetailsFailure = (
  params: number
): Types.GetCharacterDetailsFailure => ({
  type: Types.GET_CHARACTER_DETAILS_FAILURE,
  payload: params,
});

export const getCharacterDetailsDispatch = (
  token: Token,
  characterId: string | number,
  page: number
) => {
  return async (dispatch) => {
    try {
      dispatch(getCharacterDetailsRequest(page));

      const response = await HttpFetch(
        api.getCharacterDetailsQuery(token, characterId)
      );

      const { data, status, extraData, pagination } = response;

      if (status === 0) {
        compose(
          dispatch,
          getCharacterDetailsSuccess
        )({ data, extraData, pagination });
      } else {
        dispatch(getCharacterDetailsFailure(status));
      }
    } catch (error) {
      dispatch(getCharacterDetailsFailure(error.status));
    }
  };
};

export const getCharactersRequest = (
  page?: number
): Types.GetCharactersRequest => ({
  type: Types.GET_CHARACTERS_REQUEST,
  payload: page,
});

export const getCharactersSuccess = (data): Types.GetCharactersSuccess => ({
  type: Types.GET_CHARACTERS_SUCCESS,
  payload: data,
});

export const getCharactersFailure = (
  params: number
): Types.GetCharactersFailure => ({
  type: Types.GET_CHARACTERS_FAILURE,
  payload: params,
});

export const getCharactersDispatch = (token: Token, page?: number) => {
  return async (dispatch) => {
    try {
      dispatch(getCharactersRequest(page));

      const { data, status, pagination } = await compose(
        HttpFetch,
        api.getCharactersQuery
      )(token, page);

      if (status === 0) {
        dispatch(getCharactersSuccess({ data, pagination }));
      } else {
        dispatch(getCharactersFailure(status));
      }
    } catch (error) {
      dispatch(getCharactersFailure(error.status));
    }
  };
};
