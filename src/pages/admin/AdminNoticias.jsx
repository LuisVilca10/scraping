import Tableadmim from "../../components/atoms/admin/tableadmim";
import AdminDeportes from "../../components/atoms/admin/Tableadmimdeportes";
import Sidebar from "../../components/moleculas/admin/Sidebar";

const AdminNoticias = () => {
  return (
    <>
      <Sidebar />
      <div className="ml-72 mt-10">
        <Tableadmim />
      </div>
    </>
  );
};

export default AdminNoticias;
