import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
const View = ({ user }) => {
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          UserID: "-1",
          Flag: "SI",
          MemID: user.MemID.toString(),
          AuthCode: "r1d3r",
        };
        const response = await fetch(
          "https://testing.esnep.com/happyhomes/api/admin/user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              signature: "p0m76",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const respData = await response.json();
        setUserInfo(respData.Values);
        // console.log(respData.Values);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchData();
  }, [user]);

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <button
        className="bg-blue-500 p-1 rounded-lg text-white text-sm "
        onClick={() => setOpenModal(true)}
      >
        <FaEye />
      </button>

      {openModal && (
        <form>
          <div className="fixed inset-0 grid place-items-center ">
            <div
              className="bg-black opacity-50 absolute inset-0"
              onClick={onCloseModal}
            ></div>

            <div className="bg-slate-100 w-7/12  rounded-md shadow-lg  relative  ">
              <div className="bg-blue-500 col-span-3 mb-4 flex justify-between p-4">
                <h3 className="text-3xl font-bold text-white ">
                  User Information
                </h3>
                <button
                  type="button"
                  className="text-2xl font-bold text-white p-2 rounded-md hover:bg-red-700"
                  onClick={onCloseModal}
                >
                  <RxCross2 />
                </button>
              </div>

              {userInfo &&
                userInfo.map((userInfo, idx) => (
                  <div key={idx} className="p-5 ">
                    <div className="w-full lg:w-[32%] md:w-[45%] mb-3">
                      <div className="w-32 h-32 border-2 rounded">
                        <img
                          src={userInfo.UserImage}
                          alt="User"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap  gap-4 mb-2 overflow-y-auto h-80 lg:h-full ">
                      <div className="w-full lg:w-[32%] md:w-[45%]">
                        <span className="text-md font-semibold">
                          Member ID:
                        </span>
                        <h3> {userInfo.MemID}</h3>
                      </div>
                      <div className="w-full lg:w-[32%] md:w-[45%]">
                        <span className="text-md font-semibold">
                          User Type:
                        </span>
                        <h3> {userInfo.UserType === "O" ? "Owner" : "User"}</h3>
                      </div>
                      <div className="w-full lg:w-[32%] md:w-[45%]">
                        <span className="text-md font-semibold">
                          First Name:
                        </span>
                        <h3> {userInfo.FirstName}</h3>
                      </div>
                      <div className="w-full lg:w-[32%] md:w-[45%]">
                        <span className="text-md font-semibold">
                          Middle Name:
                        </span>
                        <h3> {userInfo.MiddleName}</h3>
                      </div>
                      <div className="w-full lg:w-[32%] md:w-[45%]">
                        <span className="text-md font-semibold">
                          Last Name:
                        </span>
                        <h3>{userInfo.LastName}</h3>
                      </div>

                      <div className="w-full lg:w-[32%] md:w-[45%]">
                        <span className="text-md font-semibold">Email:</span>
                        <h3>{userInfo.Email}</h3>
                      </div>
                      <div className="w-full lg:w-[32%] md:w-[45%]">
                        <span className="text-md font-semibold">
                          Phone Number:
                        </span>
                        <h3>{userInfo.PhnNum}</h3>
                      </div>
                      <div className="w-full lg:w-[32%] md:w-[45%]">
                        <span className="text-md font-semibold">
                          User Name:
                        </span>
                        <h3>{userInfo.UserName}</h3>
                      </div>

                      <div className="w-full lg:w-[32%] md:w-[45%] relative">
                        <span className="text-md font-semibold">Contact:</span>
                        <h3>{userInfo.Contact}</h3>
                      </div>

                      <div className="w-full lg:w-[32%] md:w-[45%]">
                        <span className="text-md font-semibold">Address:</span>
                        <h3>{userInfo.Address}</h3>
                      </div>

                      <div className="w-full lg:w-[32%] md:w-[45%]">
                        <span className="text-md font-semibold">
                          House Number:
                        </span>
                        <h3>{userInfo.DefHouseNum}</h3>
                      </div>
                      <div className="w-full lg:w-[32%] md:w-[45%]">
                        <span className="text-md font-semibold">
                          User Verification:
                        </span>
                        <h3>
                          {userInfo.IsVerified === "Y"
                            ? "Verified"
                            : "Not verified"}
                        </h3>
                      </div>
                    </div>

                    <div className="col-span-3 mt-6 flex justify-end">
                      <button
                        type="button"
                        className="border border-red-500 text-red-500 hover:text-white hover:underline hover:bg-red-500 font-bold py-2 px-4 rounded"
                        onClick={onCloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default View;
