import React, {Fragment, useRef} from "react";
import crypto from "crypto"


const Form = () => {
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
            //console.log(rep)
        })

    }
    return(
        <Fragment>
            test
        </Fragment>
    )
}
export default Form; 