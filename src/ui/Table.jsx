import { createContext, useContext } from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: var(--border-radius-lg);
    background-color: var(--color-grey-200);
  }
`;

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;

  /* width: 100% makes it fill the container on large screens */
  /* min-width: max-content makes sure the border always wraps the content, even when it overflows the container on small screens */
  width: 100%;
  min-width: max-content;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);

  & > *:first-child,
  & > *:nth-child(2) {
    position: sticky;
    top: 0;
    height: 100%;
    background-color: var(--color-grey-50);
  }

  & > *:first-child {
    left: 0px;
    padding-left: 1rem;
    z-index: 1;
  }
  & > *:nth-child(2) {
    left: 46px;
    padding-left: 2rem;
  }
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  & > * {
    overflow: hidden;
    overflow-wrap: break-word;
  }

  & > *:first-child,
  & > *:nth-child(2) {
    position: sticky;
    height: 100%;
    background-color: var(--color-grey-0);
  }
  & > *:first-child {
    left: 0px;
    padding-left: 1rem;
    z-index: 1;
  }
  & > *:nth-child(2) {
    left: 46px;
    padding-left: 2rem;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

function Table({ children, columns }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <TableContainer>
        <StyledTable role="table">{children}</StyledTable>
      </TableContainer>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader role="row" columns={columns}>
      {children}
    </StyledHeader>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  if (!data?.length) return <Empty>There is no rows in the table yet</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
