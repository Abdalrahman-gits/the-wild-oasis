import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import PageHeader from "../ui/PageHeader";

function Dashboard() {
  return (
    <>
      <PageHeader type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </PageHeader>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
