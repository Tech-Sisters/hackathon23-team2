import CircularChart from "../CircularChart/CircularChart";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../config";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const Profile = () => {
  const [surahStrengthCount, setSurahStrengthCount] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async (auth_id) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      try {
        const res = await axios.get(
          `${API_ENDPOINT}/surahs/surahStrengthCount?auth_id=${auth_id}`
        );
        setSurahStrengthCount(res.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData(user.uid);
      }
    });
  }, []);

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
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <CircularChart surahStrengthCount={surahStrengthCount} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
