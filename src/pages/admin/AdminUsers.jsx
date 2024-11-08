import Sidebar from "../../components/moleculas/admin/Sidebar";
import Header from "../../components/atoms/admin/header";
import Tableadminusers from "../../components/atoms/admin/Tableadminusers";
const AdminUsers = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="ml-72 mt-10">
        <Tableadminusers />
      </div>
    </>
  );
};

export default AdminUsers;
