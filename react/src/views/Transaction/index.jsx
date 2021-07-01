import React, { Fragment, useEffect, useContext, useState } from "react";
import { AppContext } from "../../store";
import Section from "../../UI/Sections";
import { dataJson } from "../../Utils/tools";
import { Form, LineChart, Table, ListBlockChain } from "../../components/index";

const Transaction = (props) => {
    const { dispatch, state } = useContext(AppContext);
    const [prev, setPrev] = useState([]);
    const minute = 60;
    const labels = [...new Array(20)].map((et,i) => i * minute); 
    const test = [];
    const datas = labels.map((item, i) => {
        const data = JSON.parse(localStorage.getItem('response'))?.blocks && JSON.parse(localStorage.getItem('response'))?.blocks.sort((a,b) => {
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
        return data && data.length;
    });

    const datat = labels.map((item, i) => {
      const data = JSON.parse(localStorage.getItem('transac')) && JSON.parse(localStorage.getItem('transac')).length > 0  && JSON.parse(localStorage.getItem('transac')).sort((a,b) => {
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
      return data && data.length;
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
            data: datat,
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
          json: state?.dataTransac,
        },
      ],
    },
  ];
   async function ajaxInter() {
    dataJson((response) => {
      if(localStorage.getItem('response') &&  localStorage.getItem('response') !== JSON.stringify(response)) {
          localStorage.setItem('response',JSON.stringify(response));
          console.log('called prev ajax')
          setPrev(response);
          return dispatch({ type: "UPDATE_JSON", dataJson: response });
      }
    });
    const time = window.setTimeout(() => {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(ajaxInter)
      } else {
        ajaxInter()
      }
      clearTimeout(time)
    }, 5000)
  }
  useEffect(() => {
    ajaxInter();
  }, []);


  useEffect(() => {
    console.log('called prev')
      dataJson((response) => {
        const newState = [...state.dataTransac];
        const [filter] = JSON.parse(localStorage.getItem('transac')).filter(item => {
          console.log('conditions',item.hash, response.transactions[0].hash, item.hash === response.transactions[0].hash);
          if(item.hash === response.transactions[0].hash) {
            return item;
          }
        });
      if(filter === undefined) {
        localStorage.setItem('transac',JSON.stringify([...newState, ...response?.transactions]));
        return dispatch({ type: "UPDATE_TRANSAC", dataTransac: [...newState, ...response?.transactions] });
      }
    }, "transaction/get");
  }, [prev])

  return <Section data={data} jsonState={state} />;
};

export default Transaction;
