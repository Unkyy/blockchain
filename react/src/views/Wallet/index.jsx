import React, {Fragment,useContext,useEffect} from 'react';
import Section from '../../UI/Sections';
import { AppContext } from "../../store";
import { dataJson } from "../../Utils/tools";
import { Form, LineChart, Table, ListWallet } from "../../components/index";
const Wallet = () => {
    const { dispatch, state } = useContext(AppContext);
    console.log(state);
    useEffect(() => {
        dataJson((response) => {
                localStorage.setItem('wallets',JSON.stringify(response));
                return dispatch({ type: "UPDATE_WALLET", dataWallet: response });
          }, "wallet/get");
      }, []);
    const data = [
        
        {
          flexDisplay: true,
          data: [
            {
              component: ListWallet,
              title: "Wallet",
              json: state?.dataWallet,
            }
            
          ],
        },
      ];

    return <Section data={data} />
}

export default Wallet;