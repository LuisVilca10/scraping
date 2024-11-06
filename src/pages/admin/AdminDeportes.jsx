import Tableadmimdeportes from "../../components/atoms/admin/Tableadmimdeportes";
import Sidebar from "../../components/moleculas/admin/Sidebar";
import Header from "../../components/atoms/admin/header";
const AdminDeportes = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="ml-72 mt-10">
        <Tableadmimdeportes />
      </div>
    </>
  );
};

export default AdminDeportes;
