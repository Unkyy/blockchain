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
        myInit.body = JSON.stringify({"amont": coins.current.value});
        console.log(myInit)
        fetch('http://localhost:5000/', myInit).then(rep => {
            console.log(rep)
        })
        // axios.get('http://localhost:5000/').then(elem => {
        //      console.log(elem)
        // })
        // var data = JSON.stringify({
        //     "test": "dedededededededede"
        //   });
          
        //   var xhr = new XMLHttpRequest();
        //   xhr.withCredentials = false;
          
        //   xhr.addEventListener("readystatechange", function () {
        //     if (this.readyState === 4) {
        //       console.log(this.responseText);
        //     }
        //   });
          
        //   xhr.open("POST", "http://localhost:5000/");
        //   xhr.setRequestHeader("content-type", "application/json");
        //   xhr.setRequestHeader("cache-control", "no-cache");   
        //   xhr.setRequestHeader('Access-Control-Allow-Origin', '*');          
        //   xhr.send(data);
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