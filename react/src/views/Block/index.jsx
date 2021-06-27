import React, {Fragment} from 'react';
import Section from '../../UI/Sections';
import data from "./data";
const Block = (props) => {
    console.log("block",props)
    return <Section data={data} {...props} />
}

export default Block;