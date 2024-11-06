import Header from "../../components/atoms/admin/header";
import Tableadmimpolitica from "../../components/atoms/admin/Tableadmimpolitica";
import Sidebar from "../../components/moleculas/admin/Sidebar";

const AdminPolitica = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="ml-72 mt-10">
        <Tableadmimpolitica />
      </div>
    </>
  );
};

export default AdminPolitica;
