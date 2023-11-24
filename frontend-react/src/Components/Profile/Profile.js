import CircularChart from "../CircularChart/CircularChart";

const Profile = () => {
  return (
    <>
      <div className="container-fluid ">
        <div className="row p-3 header mb-4">
          <div className="col-10 headerTitle py-4">
            <h3>My Profile</h3>
          </div>
        </div>
        <div className="row p-3 mb-4">
          <div className="col-12">
            <h3 className="text">Current Streak</h3>
          </div>
        </div>
        <div className="row p-3 mb-4 justify-content-center">
          <div className="col-10 text-center">
            <h3 className="text">5 days</h3>
          </div>
        </div>
        <div className="row p-3 mb-4">
          <div className="col-12">
            <h3 className="text">Strength Overview</h3>
          </div>
        </div>
        <div className="row p-3 mb-4 justify-content-center">
          <div className="col-10 text-center">
            <CircularChart />
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
