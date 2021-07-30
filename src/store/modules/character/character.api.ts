import { bearerAuthHeader } from 'src/services';
import { HttpRequest } from 'src/services/types/HttpRequest';
import HttpMethodEnum from 'src/enums/HttpMethodEnum';
import { Token } from 'src/services/types/Token';

export const getCharacterDetailsQuery = (
  token: Token,
  characterId: number | string,
  // page: number
): HttpRequest => {
  return {
    method: HttpMethodEnum.GET,
    url: `/people/${characterId}/`,
    headers: bearerAuthHeader(token.access),
  };
};

export const getCharactersQuery = (
  token: Token
  // page: number
): HttpRequest => {
  return {
    method: HttpMethodEnum.GET,
    url: '/people/',
    headers: bearerAuthHeader(token.access),
  };
};
