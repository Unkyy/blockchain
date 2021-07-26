import React, { Fragment, useContext, useEffect } from "react";
import styled , {css} from "styled-components";
import { AppContext } from "../../store";
import { dataJson } from "../../Utils/tools";
import { Form, LineChart, Table, ListWallet } from "../../components/index";
import Container from "../Container";

const Line = styled.section``;
const Transaction = styled.div`
  position: fixed;
  width: 250px;
  right: 20px;
  bottom: 20px;
  padding: 1rem;
  border-radius: 20px;
  background: #EFEFEF;
  input {
    width: 100%;
    padding: .5rem 1rem;
    margin-bottom: 1rem;
  }
`;
const FlexItem = styled.div`
    flex: 1;
    padding: 0 1rem;
`
const Section = ({ data, jsonState, ...props }) => {
  return (
    <>
      {data.map((section, i) => {
        return (
          <Line key={i}>
            <Container flexDisplay={section?.flexDisplay}>
              {section.data && section.data.map((item, i) => {
                const Component = item.component;
                return <FlexItem key={i}>
                    <Component  {...item} {...props} />
                </FlexItem>;
              })}
            </Container>
          </Line>
        );
      })}
      <Transaction>
        <Form></Form>
      </Transaction>
    </>
  );
};

export default Section;
