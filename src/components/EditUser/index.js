import { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";

function EditUser() {
  const { MemId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    UserID: "",
    UserName: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    UserType: "",
    Password: "",
    UserImage: "",
    Email: "",
    Contact: "",
    PhnNum: "",
    Address: "",
    District: "",
    DefHouseNum: "",
    IsAllow: "",
    IsVerified: "",
    BranchID: "",
    FiscalID: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!MemId) return;

      try {
        const url = `https://testing.esnep.com/happyhomes/api/admin/user/${MemId}`;
        const signature = "p0m76";

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            signature: signature,
          },
          body: JSON.stringify({
            UserID: "",
            Flag: "U",
            MemID: MemId,
            AuthCode: "r1d3r",
            Signature: signature,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        setUserData((prevUserData) => ({
          ...prevUserData,
          FirstName: responseData.FirstName,
        }));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [MemId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `https://testing.esnep.com/happyhomes/api/admin/user/update`;
      const signature = "p0m76";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          signature: signature,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error.message);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };

  return (
    <>
      <button
        className="bg-blue-500 p-1 rounded-lg text-white text-lg mx-2 "
        onClick={() => setIsOpen(true)}
      >
        <RiEdit2Fill />
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit}>
          <div className="fixed inset-0 grid place-items-center ">
            <div
              className="bg-black opacity-50 absolute inset-0"
              onClick={() => setIsOpen(false)}
            ></div>

            <div className="bg-slate-100 w-8/12  rounded-md shadow-lg  relative  ">
              <div className="bg-blue-500 col-span-3 mb-4 flex justify-between p-4">
                <h3 className="text-3xl font-bold text-white ">Add Owner</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-white p-2 rounded-md  hover:bg-red-700"
                >
                  X
                </button>
              </div>

              <div className="p-5 ">
                <div className="flex flex-wrap  gap-4 mb-2 overflow-y-auto h-80 lg:h-full ">
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label
                      htmlFor="firstName"
                      className="text-md font-semibold"
                    >
                      First Name
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      value={userData.FirstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label
                      htmlFor="middleName"
                      className="text-md font-semibold"
                    >
                      Middle Name
                    </label>
                    <input
                      type="text"
                      id="middleName"
                      placeholder="Middle Name"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      value={userData.MiddleName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="lastName" className="text-md font-semibold">
                      Last Name
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      value={userData.LastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="email" className="text-md font-semibold">
                      Email
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      value={userData.Email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label
                      htmlFor="phoneNumber"
                      className="text-md font-semibold"
                    >
                      Phone Number
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="number"
                      id="phoneNumber"
                      placeholder="Phone Number"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      value={userData.PhnNum}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="userName" className="text-md font-semibold">
                      User Name
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      id="userName"
                      placeholder="User Name"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      value={userData.UserName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="password" className="text-md font-semibold">
                      Password
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className="border border-gray-300 p-2 my-2 rounded w-full"
                      value={userData.Password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="w-full lg:w-[32%] md:w-[45%] relative">
                    <label htmlFor="contact" className="text-md font-semibold">
                      Contact
                    </label>
                    <input
                      type="number"
                      id="contact"
                      placeholder="Contact"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      value={userData.Contact}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="address" className="text-md font-semibold">
                      Address
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      placeholder="Address"
                      className="border border-gray-300 p-2 rounded w-full"
                      value={userData.Address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="district" className="text-md font-semibold">
                      District
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="number"
                      id="district"
                      placeholder="district"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      value={userData.District}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="houseNum" className="text-md font-semibold">
                      House Number
                    </label>
                    <input
                      type="number"
                      id="houseNum"
                      placeholder="House Number"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      value={userData.DefHouseNum}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-span-3 mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="border border-red-500 text-red-500 hover:text-white hover:underline hover:bg-red-500 font-bold py-2 px-4 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default EditUser;
