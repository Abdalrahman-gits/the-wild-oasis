import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  
  if (isLoading) return <Spinner />;
  
  let filteredCabins;
  // 1) Filter
  const filterValue = searchParams.get("discount") || 'all';

  if(filterValue === 'all') filteredCabins = cabins
  if(filterValue === 'with-discount') filteredCabins = cabins.filter(cabin => cabin?.discount)
  if(filterValue === 'no-discount') filteredCabins = cabins.filter(cabin => !cabin?.discount)

  // 2) Sort
  const sortByValue = searchParams.get("sortBy") || 'name-asc';

  const [field,direction] = sortByValue.split('-')
  const modifier = direction === 'asc' ? 1 : -1;
  filteredCabins.sort((a,b) => {
    if(typeof a[field] === 'string') return a[field].localeCompare(b[field]) * modifier
    return (a[field] - b[field]) * modifier
  })

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
