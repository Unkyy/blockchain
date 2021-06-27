import React, { Fragment, useContext, useEffect } from "react";
import styled , {css} from "styled-components";
import { AppContext } from "../../store";
import { dataJson } from "../../Utils/tools";
import Container from "../Container";

const Line = styled.section``;
const FlexItem = styled.div`
    flex: 1;
`
AppContext
const Section = ({ data, jsonState, ...props }) => {
  
  console.log(data);
  
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
    </>
  );
};

export default Section;
