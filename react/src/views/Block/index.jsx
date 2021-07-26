import React, {Fragment, useContext} from 'react';
import Section from '../../UI/Sections';
import { AppContext } from "../../store";
import { Form, LineChart, ListBlock, ListBlockChain } from "../../components/index";
const Block = (props) => {
    let title = "Latest Blocks";
    const { dispatch, state } = useContext(AppContext);
    let [value]  = state?.dataJson?.blocks ? state?.dataJson?.blocks.filter(item => item.hash === props.match.params.hash) : []
    if (!value) {
      title = "Transaction";
      [value] = state?.dataTransac? state?.dataTransac.filter(item => item.hash === props.match.params.hash) : []
    }
    console.log("block",value, state)
    const data = [
        {
          flexDisplay: true,
          data: [
            {
              component: ListBlock,
              title: title,
              json: value,
            }
          ],
        },
      ];
    return <Section data={data} {...props} />
}

export default Block;