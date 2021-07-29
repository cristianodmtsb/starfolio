import { scope } from './vegetable.types';

export const selectVegetables = (state) => state?.[scope] || {};
export const selectVegetablesError = (state) => state?.[scope]?.error || {};

export const selectVegetableDetails = (state) => state?.[scope] || {};
export const selectVegetableDetailsError = (state) => state?.[scope]?.error || {};
