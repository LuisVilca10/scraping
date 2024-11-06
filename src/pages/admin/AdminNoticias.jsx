import Tableadmim from "../../components/atoms/admin/tableadmim";
import AdminDeportes from "../../components/atoms/admin/Tableadmimdeportes";
import Sidebar from "../../components/moleculas/admin/Sidebar";
import Header from "../../components/atoms/admin/header";
const AdminNoticias = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="ml-72 mt-10">
        <Tableadmim />
      </div>
    </>
  );
};

export default AdminNoticias;
