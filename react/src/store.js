import React from 'react';
import { dataJson } from './Utils/tools';

if(!("response" in localStorage)) {
  localStorage.setItem('response',JSON.stringify({}));
}
if(!("transac" in localStorage)) {
  localStorage.setItem('transac',JSON.stringify([]));
}
if(!("wallets" in localStorage)) {
  localStorage.setItem('wallets',JSON.stringify({}));
}


const initialState = {
  dataJson: JSON.parse(localStorage.getItem('response')),
  dataWallet: JSON.parse(localStorage.getItem('wallets')),
  dataTransac: JSON.parse(localStorage.getItem('transac'))
};

const AppContext = React.createContext(initialState);
const { Provider } = AppContext;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = React.useReducer((state, action) => {
    console.log("state disp",state)
    switch(action.type) {
      case 'UPDATE_JSON':
        return {
          ...state,
          dataJson: action.dataJson
        };
      
        case 'UPDATE_WALLET':
          return {
            ...state,
            dataWallet: action.dataWallet
          };

      case 'UPDATE_TRANSAC':
        return {
          ...state,
          dataTransac: action.dataTransac
        };
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { AppContext, StateProvider };