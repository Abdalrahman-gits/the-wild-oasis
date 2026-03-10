import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import PageHeader from "../ui/PageHeader";

function Cabins() {
  return (
    <>
      <PageHeader type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </PageHeader>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
