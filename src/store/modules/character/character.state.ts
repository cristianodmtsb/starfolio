import { CharacterState } from './character.types';

const CharacterState = {
  error: {},
  isLoadingCharacters: false,
  characters: [],
  characterDetails: [],
  pagination: {
    currentPage: 0,
    pageSize: 0,
    totalPages: 0,
  },
};

export default CharacterState;
