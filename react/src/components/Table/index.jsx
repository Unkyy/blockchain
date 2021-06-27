import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import Pagination from '../../UI/Pagination';
import { Timer } from '../../Utils/tools';
export const TableStyle = styled.table`
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
`;

export const TbodyStyle = styled.tbody`
    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
`;
export const TheadStyle = styled(TbodyStyle)``;
const Table = ({ children, data = [], title, filter, only}) => {
    const [text, setText] = useState(Object.keys(data[0]).filter(item => {
        if (filter && !filter.split(',').includes(item)) {
            return item;
        } else if(only && only.split(',').includes(item)) {
            return item;
        }
    }).join(','));
    const [search, setSearch] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = search ? search.slice(indexOfFirstPost, indexOfLastPost) : [];

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const Field = text.split(',');
    const handleChange = (event) => {
        const cloneData = [...data]

        const inputSearch = event.target.value.toLowerCase();
        let regex = '^(?:.*)';
        for (const i in inputSearch) {
            regex += `(${inputSearch[i]})(?:.*)`;
        }
        regex += '$';
        regex = new RegExp(regex, 'gmi');
        const serch = cloneData.filter(
            elem => {
                for (let index = 0; index < Field.length; index++) {
                    let element = (typeof elem[Field[index]] == "object") ? JSON.stringify(elem[Field[index]]) : elem[Field[index]];
                    if (element && element.toString()?.match(regex)) {
                        return elem
                    }
                }
            }
        )
        setSearch(serch);
        setCurrentPage(1);
    }
    useEffect(() => {
        setSearch(data);
    }, [data])
    return <div>
        {title && <h1>{title}</h1>}
        <input type="text" value={text} onChange={event => setText(text => event.target.value)} />
        <input type="text" onChange={handleChange} />
        <TableStyle>
            <TheadStyle>
                <tr>
                    {
                        Field && Field.map((td,i) => <td key={i}>{td}</td>)
                    }
                </tr>
            </TheadStyle>

            <TbodyStyle>
                {(typeof children == "function" ? children(currentPosts, Field) : children)}
            </TbodyStyle>
        </TableStyle>
        <Pagination
            postsPerPage={postsPerPage}
            totalPosts={search && search.length}
            paginate={paginate}
            currentPage={currentPage}
        />
    </div>
}
export default Table;