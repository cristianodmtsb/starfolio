/* eslint-disable @typescript-eslint/no-explicit-any */
const configUseDispatch = (useContext: any, Context: any) => {
  return () => {
    const context = useContext(Context);

    if (!context) throw new Error('context on confiDispatch is null').message;

    const { dispatch } = context;

    return dispatch;
  };
};

export default configUseDispatch;
