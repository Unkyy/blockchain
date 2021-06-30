import React, {Fragment, useContext} from 'react';
import Section from '../../UI/Sections';
import { AppContext } from "../../store";
import { Form, LineChart, ListBlock, ListBlockChain } from "../../components/index";
const Block = (props) => {
    const { dispatch, state } = useContext(AppContext);
    const [value]  = state?.dataJson?.blocks ? state?.dataJson?.blocks.filter(item => item.hash === props.match.params.hash) : []
    console.log("block",value, state)
    const data = [
        {
          flexDisplay: true,
          data: [
            {
              component: ListBlock,
              title: "Latest Blocks",
              texte: "The most recently mined blocks",
              json: value,
            }
          ],
        },
      ];
    return <Section data={data} {...props} />
}

export default Block;