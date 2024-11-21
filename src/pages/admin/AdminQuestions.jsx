import Header from "../../components/atoms/admin/header";
import TableadminQuestions from "../../components/atoms/admin/TableadminQuestions";
import Sidebar from "../../components/moleculas/admin/Sidebar";

const AdminQuestions = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="ml-72 mt-10">
        <TableadminQuestions />
      </div>
    </>
  );
};

export default AdminQuestions;
