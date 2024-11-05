import Tableadmimpolitica from "../../components/atoms/admin/Tableadmimpolitica";
import Sidebar from "../../components/moleculas/admin/Sidebar";

const AdminPolitica = () => {
  return (
    <>
      <Sidebar />
      <div className="ml-72 mt-10">
        <Tableadmimpolitica />
      </div>
    </>
  );
};

export default AdminPolitica;
