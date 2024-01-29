import React, { useState } from "react";
import TableComponent from "../../components/Table";
import PopupComponent from "../../components/PopupModel";
import toast, { Toaster } from "react-hot-toast";

function DashboardComponent() {
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

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <Toaster />
      <div className="mx-12">
        <PopupComponent />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 my-5 mx-12">
        <div className="sm:w-1/2">
          <span className="mr-6 font-semibold text-lg">Filter Changes: </span>
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
        <div className="sm:w-1/2">
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

export default DashboardComponent;
