import React, {useState, useEffect, useRef,useContext, Fragment} from 'react';
import { Timer } from '../../Utils/tools';
import Table from '../Table';
import Link from "../../UI/Link"
import { AppContext } from "../../store";
let terms = [{
    time: 45 * 60,
    divide: 60,
    text: '%d minutes'
  }, {
    time: 24 * 60 * 60,
    divide: 60 * 60,
    text: '%d heures'
  }, {
    time: 30 * 24 * 60 * 60,
    divide: 24 * 60 * 60,
    text: '%d jours'
  }, {
    time: 365 * 24 * 60 * 60,
    divide: 24 * 60 * 60 * 30,
    text: '%d mois'
  }, {
    time: Infinity,
    divide: 24 * 60 * 60 * 365,
    text: '%d ans'
  }]
const ListBlockChain = ({json, filter = "datetime,miner,hash,nonce", title,texte}) => {
    return <>
        {title && <h1>{title}</h1>}
        {texte && <p>{texte}</p>}
        {json && json.length > 0  && <Table data={json.sort((a,b) => {
            const cond = a.date ? (new Date(b.date)).getTime() - (new Date(a.date)).getTime() : (new Date(b.datetime)).getTime() - (new Date(a.datetime)).getTime()
            return (cond)
        })} only={filter}>
        {(data, fields) => <Fragment>
                    {data.map((item, i) => <tr key={i}>
                        {fields.map((field,index) => {
                            if(field === "hash" || field === "miner") {
                                return <td key={index}><Link url={`/${field}/${item[field]}`} name={`${item[field].substring(0,16)}...`} /></td>
                            }
                            if(field === "date" || field === "datetime") {
                                let date = parseInt((new Date(item[field]).getTime() / 1000), 10)
                                let secondes = Math.floor((new Date()).getTime() / 1000 - date)
                                let term = null
                                secondes = Math.abs(secondes)
                                for (term of terms) {
                                    if (secondes < term.time) {
                                    break
                                    }
                                }
                                return <td key={index}>{`${term.text.replace('%d', Math.round(secondes / term.divide))}`}</td>
                            } 
                            return <td key={index}>{`${item[field]}`}</td>
                        })}
                    </tr>)}
                </Fragment>}
        </Table>}
    </>
} 

export default ListBlockChain;