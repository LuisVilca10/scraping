import Header from "../../components/atoms/admin/header";
import TableadminSponsor from "../../components/atoms/admin/TableadminSponsor";
import Sidebar from "../../components/moleculas/admin/Sidebar";

const AdminSponsors = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="ml-72 mt-10">
        <TableadminSponsor />
      </div>
    </>
  );
};

export default AdminSponsors;
