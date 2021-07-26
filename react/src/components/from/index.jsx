import React, {Fragment, useRef, useContext} from "react";
import crypto from "crypto"
import { AppContext } from "../../store";
import { dataJson } from "../../Utils/tools";

const Form = () => {
    const { dispatch, state } = useContext(AppContext);
    const coins = useRef()
    const toAddress = useRef()
    const passphrase = useRef()
    //const {transaction, setTransaction} = useState()
    const myInit = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        header:{'Content-Type': 'application/json'},
    };
    const getRandomInt = (max) =>  {
        return Math.floor(Math.random() * Math.floor(max));
      }
    const handleClick = (e)  => {
        e.preventDefault()
        let transaction = {
            "amount": coins.current.value,
            "toAddress": toAddress.current.value,
            "passphrase": passphrase.current.value,
            "datetime": Date.now()
        }
        const hash = crypto.createHash('sha256')
        .update(JSON.stringify(transaction) + getRandomInt(2000))
        .digest('hex')
        
        const finalTransac = {...transaction, hash}
        //const toto = [...new Array(100)].map( elem => finalTransac)

        console.log('--->>',finalTransac)
        myInit.body = JSON.stringify(finalTransac);
        //console.log(myInit)

        fetch('http://localhost:5000/transaction/create', myInit).then(rep => {
            dataJson((response) => {
                const newState = [...state.dataTransac];
                const [filter] = JSON.parse(localStorage.getItem('transac')).filter(item => item.hash );
                if(filter === undefined) {
                    localStorage.setItem('transac',JSON.stringify([...newState, ...response?.transactions]));
                    return dispatch({ type: "UPDATE_TRANSAC", dataTransac: [...newState, ...response?.transactions] });
                }
            }, "transaction/get");
            //console.log(rep)
        })

    }
    return(
        <Fragment>
            <label htmlFor="number">amount : </label>
            <input id="number" type="number" ref={coins}></input>
            <label  htmlFor="fname">toAddress :</label>
            <input id="toAddress"  ref={toAddress}></input>
            <label htmlFor="passphrase">passphrase : </label>
            <input  id="passphrase"  ref={passphrase}></input>
            <button onClick={handleClick}>
                payer
            </button>
        </Fragment>
    )
}
export default Form; 

