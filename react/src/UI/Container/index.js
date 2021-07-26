import styled , {css} from "styled-components";
const Container = styled.div`
  max-width: 1200px;
  padding: 0 30px;
  margin: 0 auto;
  ${props => props.flexDisplay && css`
    display: flex;
  `}
`;

export default Container;