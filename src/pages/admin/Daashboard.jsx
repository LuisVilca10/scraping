import CardBarChart from "../../components/atoms/admin/CardBarChart";
import CardLineChart from "../../components/atoms/admin/CardLineChart";
import CardPageVisits from "../../components/atoms/admin/CardPageVisits";
import CardSocialTraffic from "../../components/atoms/admin/CardSocialTraffic";
import Sidebar from "../../components/moleculas/admin/Sidebar";

const Daashboard = () => {
  return (
    <>
      <Sidebar />
      <div className="ml-64 mt-10 pr-7">
        <div className="flex flex-wrap">
          <div className="w-full xl:w-5/12 mb-12 xl:mb-0 px-4 my-5">
            <CardLineChart />
          </div>
          <div className="w-full xl:w-7/12 px-5 my-5"><CardBarChart /></div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardPageVisits />
          </div>
          <div className="w-full xl:w-4/12 px-4">
             <CardSocialTraffic />
          </div>
        </div>
      </div>
    </>
  );
};

export default Daashboard;
