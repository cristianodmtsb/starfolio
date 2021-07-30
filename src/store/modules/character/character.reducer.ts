import { Action } from 'src/services/types/Action';
import Switch from 'src/utils/functions/Switch';
import * as Types from './character.types';
import InitialState from './character.state';
import { Pagination } from 'src/store/types';
import {
  adaptDataByPage,
  adaptPagination,
} from 'src/store/adapters/pagination.adapters';

const getChracters = {
  request: (state: Types.CharacterState, currentPage: number) => {
    const characters = adaptDataByPage<Types.Character[]>(
      currentPage,
      [],
      state.characters,
      true
    );

    const pagination = adaptPagination(
      currentPage,
      InitialState.pagination,
      state.pagination
    );

    return {
      ...state,
      characters,
      isLoadingCharacters: true,
      pagination,
      error: {
        msg: '',
      },
    };
  },

  success: (
    state: Types.CharacterState,
    payload: { data: Types.Character[]; pagination: Pagination }
  ) => {
    const characters = adaptDataByPage<Types.Character[]>(
      state.pagination.currentPage,
      payload.data,
      [...state.characters, ...payload.data]
    );

    return {
      ...state,
      isLoadingCharacters: false,
      characters,
      pagination: payload.pagination,
      error: {
        status: null,
        msg: '',
        loadingCharactersFail: false,
      },
    };
  },
  failure: (state: Types.CharacterState, payload: number) => {
    const ErrorMsg = {
      401: 'Ops! Você não tem autorização para visualizar este personagem',
      400: 'Ops! Não conseguimos carregar os personagens.',
      default: 'Ops! Não conseguimos carregar os dados do personagem.',
    };
    return {
      ...state,
      isLoadingCharacters: false,
      characters: payload,
      error: {
        status: payload,
        msg: ErrorMsg[payload] || ErrorMsg.default,
      },
    };
  },
};

const getCharacterDetails = {
  request: (state: Types.CharacterState, currentPage: number) => {
    const characterDetails = adaptDataByPage<Types.Character[]>(
      currentPage,
      [],
      state.characterDetails,
      true
    );

    const pagination = adaptPagination(
      currentPage,
      InitialState.pagination,
      state.pagination
    );

    return {
      ...state,
      isLoadingCharacterDetails: true,
      characterDetails,
      pagination,
      error: {
        msg: '',
      },
    };
  },

  success: (
    state: Types.CharacterState,
    payload: {
      data: Types.Character[];
      pagination: Pagination;
    }
  ) => {
    const characterDetails =
      state.pagination.currentPage === 0
        ? payload.data
        : [...state.characterDetails, ...payload.data];

    return {
      ...state,
      characterDetails,
      isLoadingCharacterDetails: false,
      pagination: payload.pagination,
      error: {
        status: null,
        msg: '',
      },
    };
  },
  failure: (state: Types.CharacterState, payload) => {
    const ErrorMsg = {
      401: 'Ops! Você não tem autorização para visualizar este personagem',
      400: 'Ops! Não conseguimos carregar os dados do personagem.',
      default: 'Ops! Não conseguimos carregar os dados do personagem.',
    };

    return {
      ...state,
      ...state,
      characterDetails: payload.data,
      isLoadingCharacterDetails: false,
      error: {
        status: null,
        msg: ErrorMsg[payload] || ErrorMsg.default,
      },
    };
  },
};

const characterReducer = (state = InitialState, action: Action) => {
  return Switch.on(action.type, state, action?.payload, InitialState)
    .case(Types.GET_CHARACTERS_REQUEST, getChracters.request)
    .case(Types.GET_CHARACTERS_SUCCESS, getChracters.success)
    .case(Types.GET_CHARACTERS_FAILURE, getChracters.failure)

    .case(Types.GET_CHARACTER_DETAILS_REQUEST, getCharacterDetails.request)
    .case(Types.GET_CHARACTER_DETAILS_SUCCESS, getCharacterDetails.success)
    .case(Types.GET_CHARACTER_DETAILS_FAILURE, getCharacterDetails.failure)

    .default(state);
};

export default characterReducer;
