import react, {Fragment, useRef} from "react";
import axios from "axios"



const Form = () => {
    const coins = useRef()
    const myInit = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        header:{'Content-Type': 'application/json'},
    };

    const handleClick = (e) => {
        e.preventDefault()
        myInit.body = {"amont": coins.current.value};
        console.log(myInit)
        //fetch('http://localhost:5000/', myInit).then(rep => {
        //    console.log(rep)
        //})
        axios.get('http://localhost:5000/').then(elem => {
            console.log(elem)
        })
    }
    return(
        <Fragment>   
            <input type="number" ref={coins}></input>
            <button onClick={handleClick}>
                Cliquez ici
            </button>
        </Fragment>
    )
}
export default Form; 