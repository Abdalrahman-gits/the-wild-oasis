import styled from "styled-components";
import Row from "./Row";

const CustomRow = styled(Row)`
  @media (max-width: 990px) {
    flex-direction: column;
    align-items: flex-start;
    row-gap: 3rem;
  }
`;

function PageHeader({ children }) {
  return <CustomRow type="horizontal">{children}</CustomRow>;
}

export default PageHeader;
