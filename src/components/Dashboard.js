import React, { useContext, useState } from "react";
import TableComponent from "./Table";
import PopupComponent from "./AddUser";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [filterIsVerified, setFilterIsVerified] = useState("-1");
  const [filterIsAllow, setFilterIsAllow] = useState("-1");
  const handleIsVerifiedChange = (value) => {
    setFilterIsVerified(value);
  };

  const handleIsAllowChange = (value) => {
    setFilterIsAllow(value);
  };

  function handleUserVerificationChange(user) {
    const newVerificationStatus = user.IsVerified === "Y" ? "N" : "Y";

    const requestBody = {
      UserID: user.UserID,
      Flag: "VU",
      IsVerified: newVerificationStatus,
      MemID: user.MemID.toString(),
      AuthCode: "r1d3r",
    };

    const headers = {
      "Content-Type": "application/json",
      Signature: "p0m76",
    };

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    };

    const apiUrl = "https://testing.esnep.com/happyhomes/api/admin/user";

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.StatusCode === 200 && data.Message === "Success") {
          toast.success("Verification successful!");
        } else {
          console.error(
            "Verification failed. StatusCode:",
            data.StatusCode,
            "Message:",
            data.Message
          );
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }

  function handleAllowAppChange(user) {
    const newAllowStatus = user.IsAllow === "Y" ? "N" : "Y";

    const requestBody = {
      UserID: "13",
      Flag: "AD",
      IsAllow: newAllowStatus,
      MemID: user.MemID.toString(),
      AuthCode: "r1d3r",
    };
    const headers = {
      "Content-Type": "application/json",
      Signature: "p0m76",
    };
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    };
    const apiUrl = "https://testing.esnep.com/happyhomes/api/admin/user";
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.StatusCode === 200 && data.Message === "Success") {
          toast.success("Allow app status successful!");
        } else {
          console.error(
            "Verification failed. StatusCode:",
            data.StatusCode,
            "Message:",
            data.Message
          );
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }
  function handleStatusChange(user) {
    const newStatus = user.IsActive === "A" ? "I" : "A";

    const requestBody = {
      UserID: user.UserID,
      Flag: "AI",
      IsActive: newStatus,
      MemID: user.MemID.toString(),
      AuthCode: "r1d3r",
    };
    const headers = {
      "Content-Type": "application/json",
      Signature: "p0m76",
    };
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    };
    const apiUrl = "https://testing.esnep.com/happyhomes/api/admin/user";
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.StatusCode === 200 && data.Message === "Success") {
          toast.success("Status change successful!");
        } else {
          console.error(
            "Verification failed. StatusCode:",
            data.StatusCode,
            "Message:",
            data.Message
          );
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }

  const logoutHandler = (e) => {
    localStorage.clear();
    sessionStorage.clear();
    logout();
    navigate("/");
  };

  return (
    <div className="container w-[95%] mx-auto p-2 sm:p-4 md:p-6 lg:p-8 ">
      <Toaster />
      <div className="flex flex-row justify-between">
        <PopupComponent />
        <button
          onClick={logoutHandler}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded "
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col sm:flex-row my-5  gap-2">
        <span className=" font-semibold text-lg">Filter Changes:</span>

        <div>
          <label htmlFor="verifiedDropdown">User Verification: </label>
          <select
            id="verifiedDropdown"
            name="verifiedDropdown"
            value={filterIsVerified}
            onChange={(e) => handleIsVerifiedChange(e.target.value)}
            className="border-2 rounded-lg border-solid border-black"
          >
            <option value="-1">All</option>
            <option value="Y">Verified</option>
            <option value="N">Not Verified</option>
          </select>
        </div>
        <div>
          <label htmlFor="allowDropdown">Allow App: </label>
          <select
            id="allowDropdown"
            name="allowDropdown"
            value={filterIsAllow}
            onChange={(e) => handleIsAllowChange(e.target.value)}
            className="border-2 rounded-lg border-solid border-black"
          >
            <option value="-1">All</option>
            <option value="Y">Allowed</option>
            <option value="N">Not Allowed</option>
          </select>
        </div>
      </div>
      <TableComponent
        filterIsVerified={filterIsVerified}
        filterIsAllow={filterIsAllow}
        handleUserVerificationChange={handleUserVerificationChange}
        handleAllowAppChange={handleAllowAppChange}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default Dashboard;
