import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import { Timer } from '../../Utils/tools';
const RootPaginate = styled.div`
    width: fit-content;
    display: flex;
    margin: auto;
    margin-top: 16px;
    column-gap: 8px;

    span {
        padding: 8px 16px;
        border: 1px solid #000;
        text-align: center;
        cursor: pointer;
        font-weight: bold;
    }
`;
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <RootPaginate>
            <span onClick={() => {
                if (currentPage - 1 < 1) {
                    paginate(1);
                } else {
                    paginate(currentPage - 1);
                }
            }}>prev</span>
            <span> {`${currentPage} - ${pageNumbers.length}`} </span>
            <span onClick={() => {
                if (currentPage > pageNumbers.length - 1) {
                    paginate(pageNumbers.length)
                } else {
                    paginate(currentPage + 1)
                }
            }}>next</span>
        </RootPaginate>
    );
};
export default Pagination;