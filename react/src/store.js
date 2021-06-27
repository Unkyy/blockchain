import React from 'react';
import { dataJson } from './Utils/tools';

const initialState = {
  dataJson: {}
};

const AppContext = React.createContext(initialState);
const { Provider } = AppContext;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch(action.type) {
      case 'UPDATE_JSON':
      return {
        ...state,
        dataJson: action.dataJson
      };
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { AppContext, StateProvider };