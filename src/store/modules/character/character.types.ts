import { Pagination, StateError } from 'src/store/types';

export const scope = 'character';

export const GET_CHARACTER_DETAILS_REQUEST = `@${scope}:GET_CHARACTER_DETAILS_REQUEST`;
export const GET_CHARACTER_DETAILS_SUCCESS = `@${scope}:GET_CHARACTER_DETAILS_SUCCESS`;
export const GET_CHARACTER_DETAILS_FAILURE = `@${scope}:GET_CHARACTER_DETAILS_FAILURE`;

export const GET_CHARACTERS_REQUEST = `@${scope}:GET_CHARACTERS_REQUEST`;
export const GET_CHARACTERS_SUCCESS = `@${scope}:GET_CHARACTERS_SUCCESS`;
export const GET_CHARACTERS_FAILURE = `@${scope}:GET_CHARACTERS_FAILURE`;

export type Character = {
  id?: string;
  title: string;
};

export type CharacterState = {
  error: StateError;
  isLoadingCharacters: boolean;
  characters: Character[];
  characterDetails: Character[];
  pagination: Pagination;
};

export interface GetCharacterDetailsRequest {
  type: typeof GET_CHARACTER_DETAILS_REQUEST;
  payload: number;
}

export interface GetCharacterDetailsSuccess {
  type: typeof GET_CHARACTER_DETAILS_SUCCESS;
  payload: {
    data: Character[];
    pagination: Pagination;
  };
}

export interface GetCharacterDetailsFailure {
  type: typeof GET_CHARACTER_DETAILS_FAILURE;
  payload: number;
}

export interface GetCharactersRequest {
  type: typeof GET_CHARACTERS_REQUEST;
  payload?: number;
}

export interface GetCharactersSuccess {
  type: typeof GET_CHARACTERS_SUCCESS;
  payload: { data: Character[]; pagination: Pagination };
}

export interface GetCharactersFailure {
  type: typeof GET_CHARACTERS_FAILURE;
  payload: number;
}

export type CharacterActionsTypes =
  | GetCharacterDetailsRequest
  | GetCharacterDetailsSuccess
  | GetCharacterDetailsFailure
  | GetCharactersRequest
  | GetCharactersSuccess
  | GetCharactersFailure;
