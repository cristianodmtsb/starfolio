import { scope } from './character.types';

export const selectCharacters = (state) => state?.[scope] || {};
export const selectCharactersError = (state) => state?.[scope]?.error || {};

export const selectCharacterDetails = (state) => state?.[scope] || {};
export const selectCharacterDetailsError = (state) => state?.[scope]?.error || {};
