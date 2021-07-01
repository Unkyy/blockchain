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
    max-height: 220px;
    overflow-y: auto;
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
const ListWallet = ({json, filter = "datetime,miner,value,hash,nonce", title,texte, ...props}) => {
  console.log(json)
    return <>
        {title && <h1>{title}</h1>}
        {texte && <p>{texte}</p>}
        {json?.KeysPair && <>
          {json.KeysPair.map((transac, index) =><>
            <ElementParent>
             <ElementChild>
                <ElementChildChild><InsideLeft>Adress:</InsideLeft> <InsideRight>{json.address[index]}</InsideRight></ElementChildChild>
                
              </ElementChild>
              <ElementChild>
              <ElementChildChild><InsideLeft>privateKey</InsideLeft> </ElementChildChild>
              <ElementChildChild> <InsideRight>publicKey</InsideRight></ElementChildChild>
                
              </ElementChild>
              <ElementChild>
              <ElementChildChild>
                  {transac.privateKey}
                </ElementChildChild>
                <ElementChildChild>
                  <InsideRight>{transac.publicKey}</InsideRight>
                </ElementChildChild>
              </ElementChild>
          </ElementParent>
          </>)}
        </> }
    </>
} 

export default ListWallet;