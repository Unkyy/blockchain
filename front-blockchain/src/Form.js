import react, {Fragment, useRef} from "react";
import crypto from "crypto"


const Form = () => {
    const coins = useRef()
    const user = useRef()
    const password = useRef()
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
            "user": user.current.value,
            "password": password.current.value,
            "datetime": Date.now(),
            "test": 'lllooooolll'
        }
        const hash = crypto.createHash('sha256')
        .update(JSON.stringify(transaction) + getRandomInt(2000))
        .digest('hex')
        
        const finalTransac = {...transaction, hash}
        //const toto = [...new Array(100)].map( elem => finalTransac)

        console.log('--->>',finalTransac)
        myInit.body = JSON.stringify(finalTransac);
        //console.log(myInit)

        fetch('http://localhost:5000/transaction', myInit).then(rep => {
            //console.log(rep)
        })

    }
    return(
        <Fragment>
            <label for="number">amount : </label>
            <input id="number" type="number" ref={coins}></input>
            <label  for="fname">user :</label>
            <input id="user"  ref={user}></input>
            <label for="password">password : </label>
            <input  id="password"  ref={password}></input>
            <button onClick={handleClick}>
                acheter des halgo
            </button>
        </Fragment>
    )
}
export default Form; 