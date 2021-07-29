import { Action } from 'src/services/types/Action';
import Switch from 'src/utils/functions/Switch';
import * as Types from './vegetable.types';
import InitialState from './vegetable.state';
import { Pagination } from 'src/store/types';
import {
  adaptDataByPage,
  adaptPagination,
} from 'src/store/adapters/pagination.adapters';

const getVegetables = {
  request: (state: Types.VegetableState, currentPage: number) => {
    const vegetables = adaptDataByPage<Types.Vegetable[]>(
      currentPage,
      [],
      state.vegetables,
      true
    );

    const pagination = adaptPagination(
      currentPage,
      InitialState.pagination,
      state.pagination
    );

    return {
      ...state,
      vegetables,
      isLoadingVegetables: true,
      pagination,
      error: {
        msg: '',
      },
    };
  },

  success: (
    state: Types.VegetableState,
    payload: { data: Types.Vegetable[]; pagination: Pagination }
  ) => {
    const vegetables = adaptDataByPage<Types.Vegetable[]>(
      state.pagination.currentPage,
      payload.data,
      [...state.vegetables, ...payload.data]
    );

    return {
      ...state,
      isLoadingVegetables: false,
      vegetables,
      pagination: payload.pagination,
      error: {
        status: null,
        msg: '',
        loadingVegetablesFail: false,
      },
    };
  },
  failure: (state: Types.VegetableState, payload: number) => {
    const ErrorMsg = {
      401: 'Ops! Você não tem autorização para visualizar este alarme',
      400: 'Ops! Não conseguimos carregar os alarmes.',
      default: 'Ops! Não conseguimos carregar os dados dos alarmes.',
    };
    return {
      ...state,
      isLoadingVegetables: false,
      vegetables: payload,
      error: {
        status: payload,
        msg: ErrorMsg[payload] || ErrorMsg.default,
      },
    };
  },
};

const getVegetableDetails = {
  request: (state: Types.VegetableState, currentPage: number) => {
    const vegetableDetails = adaptDataByPage<Types.Vegetable[]>(
      currentPage,
      [],
      state.vegetableDetails,
      true
    );

    const pagination = adaptPagination(
      currentPage,
      InitialState.pagination,
      state.pagination
    );

    return {
      ...state,
      isLoadingVegetableDetails: true,
      vegetableDetails,
      pagination,
      error: {
        msg: '',
      },
    };
  },

  success: (
    state: Types.VegetableState,
    payload: {
      data: Types.Vegetable[];
      pagination: Pagination;
    }
  ) => {
    const alarmDetails =
      state.pagination.currentPage === 0
        ? payload.data
        : [...state.vegetableDetails, ...payload.data];

    return {
      ...state,
      vegetableDetails: alarmDetails,
      isLoadingVegetableDetails: false,
      pagination: payload.pagination,
      error: {
        status: null,
        msg: '',
      },
    };
  },
  failure: (state: Types.VegetableState, payload) => {
    const ErrorMsg = {
      401: 'Ops! Você não tem autorização para visualizar este alarme',
      400: 'Ops! Não conseguimos carregar os dados do alarme.',
      default: 'Ops! Não conseguimos carregar os dados do alarme.',
    };

    return {
      ...state,
      ...state,
      vegetableDetails: payload.data,
      isLoadingVegetableDetails: false,
      error: {
        status: null,
        msg: ErrorMsg[payload] || ErrorMsg.default,
      },
    };
  },
};

const alarmReducer = (state = InitialState, action: Action) => {
  return Switch.on(action.type, state, action?.payload, InitialState)
    .case(Types.GET_VEGETABLES_REQUEST, getVegetables.request)
    .case(Types.GET_VEGETABLES_SUCCESS, getVegetables.success)
    .case(Types.GET_VEGETABLES_FAILURE, getVegetables.failure)

    .case(Types.GET_VEGETABLE_DETAILS_REQUEST, getVegetableDetails.request)
    .case(Types.GET_VEGETABLE_DETAILS_SUCCESS, getVegetableDetails.success)
    .case(Types.GET_VEGETABLE_DETAILS_FAILURE, getVegetableDetails.failure)

    .default(state);
};

export default alarmReducer;
