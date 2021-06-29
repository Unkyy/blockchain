import React, {useRef, useEffect, Fragment} from 'react';
import { Timer } from '../../Utils/tools';
const Title = ({title, texte}) => {
    // const [data] = json?.default?.blocks.filter(item => item.hash === params.hash)
    // console.log("title",data);
    // const ref = useRef();
    // useEffect(() => {
    //     ref.current && Timer();
    //     console.log("current",ref.current)
    // }, [ref.current])
    return <>
        {title && <h1>{title}</h1>}
        {texte && <p>{texte}</p>}
    </>
}

export default Title;