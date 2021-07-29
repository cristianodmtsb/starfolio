/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
const configUseSelector = (useContext: any, Context: any) => {
  return (selectFn: Function) => {
    const context = useContext(Context);

    if (!context)
      throw new Error('context on confiUseSelector is null').message;
    const { state } = context;

    if (selectFn && typeof selectFn === 'function') {
      return selectFn(state);
    }

    return state;
  };
};

export default configUseSelector;
