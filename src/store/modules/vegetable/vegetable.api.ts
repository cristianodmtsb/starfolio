import { bearerAuthHeader } from 'src/services';
import { HttpRequest } from 'src/services/types/HttpRequest';
import HttpMethodEnum from 'src/enums/HttpMethodEnum';
import { Token } from 'src/services/types/Token';
// import { adaptUrlByPage } from 'src/store/adapters/pagination.adapters';

export const getVegetableDetailsQuery = (
  token: Token,
  vegetableId: number | string,
  // page: number
): HttpRequest => {
  return {
    method: HttpMethodEnum.GET,
    // url: adaptUrlByPage(`/alarm/${vegetableId}/`, page),
    url: `/vegetable/${vegetableId}/`,
    headers: bearerAuthHeader(token.access),
  };
};

export const getVegetablesQuery = (
  token: Token
  // page: number
): HttpRequest => {
  return {
    method: HttpMethodEnum.GET,
    // url: adaptUrlByPage('/vegetable/', page),
    url: '/vegetable/',
    headers: bearerAuthHeader(token.access),
  };
};
