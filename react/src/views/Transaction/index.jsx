import React, { Fragment, useEffect, useContext, useState } from "react";
import { AppContext } from "../../store";
import Section from "../../UI/Sections";
import { dataJson } from "../../Utils/tools";
import { Form, LineChart, Table, ListBlockChain } from "../../components/index";
localStorage.setItem('response',JSON.stringify([]));
const Transaction = (props) => {
    const { dispatch, state } = useContext(AppContext);
    const [prev, setPrev] = useState([]);
    const minute = 60;
    const labels = [...new Array(20)].map((et,i) => i * minute); 
    const test = [];
    const datas = labels.map((item, i) => {
        const data = JSON.parse(localStorage.getItem('response')).sort((a,b) => {
            const cond = a.date ? (new Date(b.date)).getTime() - (new Date(a.date)).getTime() : (new Date(b.datetime)).getTime() - (new Date(a.datetime)).getTime()
            return (cond)
        }).filter(elem => {
            const beforeTime = (i - 1 < 0) ? labels[0] : labels[i - 1];
            let date = parseInt((new Date(elem.datetime).getTime() / 1000), 10)
            let secondes = Math.floor((new Date()).getTime() / 1000 - date);
            if(i === 0 ) {
                if(secondes < beforeTime) {
                    return elem;
                }
            } else {
                if (secondes > beforeTime && secondes < item) {
                    return elem
                }
            }
        });
        return data.length;
    });
  const data = [
    {
      flexDisplay: true,
      data: [
        {
          component: LineChart,
          data: datas,
          labels: labels,
          backgroundColor: "#dff5fa",
          borderColor: "rgba(80, 207, 231,1)",
        },
        {
            component: LineChart,
            data: datas,
            labels: labels,
            backgroundColor: "#dff5fa",
            borderColor: "rgba(80, 207, 231,1)",
          }
      ],
    },
    {
      flexDisplay: true,
      data: [
        {
          component: ListBlockChain,
          title: "Latest Blocks",
          texte: "The most recently mined blocks",
          json: state?.dataJson?.blocks,
        },
        {
          component: ListBlockChain,
          title: "Latest Transactions",
          texte: "The most recently published unconfirmed transactions",
          filter: "hash,datetime",
          json: state?.dataJson?.blocks
            ? state?.dataJson?.blocks.map((item) => item.transactions[0])
            : [],
        },
      ],
    },
  ];
  function ajaxInter() {
    let called = true;
    if (!called) return;
    const lastPrev = [...prev];

    
    dataJson((response) => {
        console.log(lastPrev.length !== response?.blocks.length)
        if(localStorage.getItem('response') &&  JSON.parse(localStorage.getItem('response')).length !== response?.blocks.length) {
            setPrev(response?.blocks)
            localStorage.setItem('response',JSON.stringify(response?.blocks));
            return dispatch({ type: "UPDATE_JSON", dataJson: response });
        }
    });
    const time = window.setTimeout(function () {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(ajaxInter);
      } else {
        ajaxInter();
      }
      called = true;
      clearTimeout(time);
    }, 5 * 1000);
    called = false;
  }
  useEffect(() => {
    ajaxInter();
  }, []);

  return <Section data={data} jsonState={state} />;
};

export default Transaction;
