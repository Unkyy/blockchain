import React, {Fragment} from 'react';
import Section from '../../UI/Sections';
import { AppContext } from "../../store";
import data from "./data";
const Home = () => {
    

    return <Section data={data} />
}

export default Home;