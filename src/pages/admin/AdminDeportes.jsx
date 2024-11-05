import Tableadmimdeportes from "../../components/atoms/admin/Tableadmimdeportes";
import Sidebar from "../../components/moleculas/admin/Sidebar";

const AdminDeportes = () => {
  return (
    <>
      <Sidebar />
      <div className="ml-72 mt-10">
        <Tableadmimdeportes />
      </div>
    </>
  );
};

export default AdminDeportes;
