import { VegetableState } from './vegetable.types';

const vegetableState: VegetableState = {
  error: {},
  isLoadingVegetables: false,
  vegetables: [],
  vegetableDetails: [],
  pagination: {
    currentPage: 0,
    pageSize: 0,
    totalPages: 0,
  },
};

export default vegetableState;
