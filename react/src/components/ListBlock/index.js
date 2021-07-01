import React, {useState, useEffect, useRef,useContext, Fragment} from 'react';
import styled , {css} from "styled-components";
import { Timer } from '../../Utils/tools';
import Table from '../Table';
import Link from "../../UI/Link"
import { AppContext } from "../../store";
const ElementParent = styled.div`
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 1rem 0px;
    border-bottom: 1px solid rgb(240, 242, 247);
`

const ElementChild = styled.div`
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;rgb(240, 242, 247);
    @media (min-width: 48rem) {
      flex-direction: row;
    }
`

const ElementChildChild = styled.div`
        display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 0px 0.5rem;
    @media (min-width: 48rem) {
      width: 50%;
    }
`

const InsideLeft = styled.div`
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100px;
    padding: 0.5rem;
    @media (min-width: 48rem) {
      -webkit-box-pack: start;
      justify-content: flex-start;
    }
`

const InsideRight = styled.div`
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    align-items: flex-start;
    width: calc(100% - 100px);
    padding: 0.5rem;
    @media (min-width: 48rem) {
      -webkit-box-pack: start;
      justify-content: flex-start;
    }
`


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
const ListBlock = ({json, filter = "datetime,miner,value,hash,nonce", title,texte, ...props}) => {
  console.log("filterBlock",json)
    return <>
        {title && <h1>{title}</h1>}
        {texte && <p>{texte}</p>}
        {Object.keys(json) && Object.keys(json).length > 0  && <Table data={Object.keys(json).filter(filt => filt !== "transactions").map(hash => ({hash, value: json[hash]})).sort((a,b) => {
            const cond = a.date ? (new Date(b.date)).getTime() - (new Date(a.date)).getTime() : (new Date(b.datetime)).getTime() - (new Date(a.datetime)).getTime()
            return (cond)
        })} only={filter}>
        {(data, fields) => <Fragment>
                    {data.map((item, i) => <tr key={i}>
                        {fields.map((field,index) => {
                          console.log(item[field])
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

        {json?.transactions && <>
          {json.transactions.map((transac,index) => <>
            <ElementParent>
             <ElementChild>
              <ElementChildChild><InsideLeft>Hash</InsideLeft> <InsideRight>{transac.hash}</InsideRight></ElementChildChild>
            </ElementChild>
            
          </ElementParent>
          <ElementParent>
          <ElementChild>
          {json.transactions[index].inputs.length > 0 ? json.transactions[index].inputs.map(transac => <ElementChildChild><InsideLeft>Hash</InsideLeft>
              <InsideRight>{transac.toAddress}</InsideRight>
              </ElementChildChild>
            ) : <ElementChildChild><InsideLeft>Reward</InsideLeft></ElementChildChild>}
            {json.transactions[index].outputs.map(transac => <ElementChildChild><InsideLeft><svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" class="sc-1ub63u6-0 hDAkGl"><g id="background"><rect fill="none" height="32" width="32"></rect></g><g id="arrow_x5F_full_x5F_right"><polygon points="16,2.001 16,10 2,10 2,22 16,22 16,30 30,16  "></polygon></g></svg></InsideLeft>
              <InsideRight>{transac.toAddress}</InsideRight>
              </ElementChildChild>
            )}
            </ElementChild>
          </ElementParent>
          </>)}
        </> }
    </>
} 

export default ListBlock;