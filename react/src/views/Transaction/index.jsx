import React, {Fragment,useEffect, useContext} from 'react';
import { AppContext } from '../../store';
import Section from '../../UI/Sections';
import { dataJson } from '../../Utils/tools';
import {
    Form, Title,Table,ListBlockChain
} from "../../components/index";
// import data from "./data";
const Transaction = (props) => {
    const { dispatch, state } = useContext(AppContext);
    state?.dataJson?.blocks && console.log("state Trans",state?.dataJson?.blocks.map(item => item.transactions[0]))
    const data = [{
        flexDisplay: true,
        data: [{
            component: ListBlockChain,
            title: "Latest Blocks",
            texte: "The most recently mined blocks",
            json: state?.dataJson?.blocks
        },{
            component: ListBlockChain,
            title: "Latest Blocks",
            texte: "The most recently mined blocks",
            filter: "hash,datetime",
            json: state?.dataJson?.blocks ? state?.dataJson?.blocks.map(item => item.transactions[0]) : []
        }
    ]
    }]
    function ajaxInter () {
        let called = true;
        if(!called) return;
        dataJson(response => dispatch({type: "UPDATE_JSON", dataJson: response}));
        const time = window.setTimeout(function () {
              if (window.requestAnimationFrame) {
                window.requestAnimationFrame(ajaxInter)
              } else {
                ajaxInter()
            }
            called = true;
            clearTimeout(time);
          }, 5 * 1000)
        called = false;  
    }
    useEffect(() => {
        ajaxInter();
    }, [])

    return <Section data={data} jsonState={state} />
}

export default Transaction;