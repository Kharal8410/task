import React, { useState, useContext, useEffect } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { UserContext } from "../../context/UpdateContex";
import { RxCross2 } from "react-icons/rx";
const Edit = ({ user }) => {
  const [openModal, setOpenModal] = useState(false);
  const { updateUser, setUpdateUser } = useContext(UserContext);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://testing.esnep.com/happyhomes/api/admin/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Signature: "p0m76",
          },
          body: JSON.stringify(updateUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user information");
      }

      const updatedUserData = await response.json();

      setUpdateUser(updatedUserData);

      onCloseModal();
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  useEffect(() => {
    setUpdateUser({
      ...user,
    });
  }, [setUpdateUser, user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdateUser({ ...updateUser, [name]: value });
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <button
        className="bg-blue-500 p-1 rounded-lg text-white text-lg mx-2"
        onClick={() => setOpenModal(true)}
      >
        <RiEdit2Fill />
      </button>

      {openModal && (
        <form onSubmit={handleFormSubmit}>
          <div className="fixed inset-0 grid place-items-center ">
            <div
              className="bg-black opacity-50 absolute inset-0"
              onClick={onCloseModal}
            ></div>

            <div className="bg-slate-100 w-9/12  rounded-md shadow-lg  relative  ">
              <div className="bg-blue-500 col-span-3 mb-4 flex justify-between p-4">
                <h3 className="text-3xl font-bold text-white ">edit</h3>
                <button
                  type="button"
                  className="text-2xl font-bold text-white p-2 rounded-md hover:bg-red-700"
                  onClick={onCloseModal}
                >
                  <RxCross2 />
                </button>
              </div>

              <div className="p-5 ">
                <div className="flex flex-wrap  gap-4 mb-2 overflow-y-auto h-80 lg:h-full ">
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label
                      htmlFor="firstName"
                      className="text-md font-semibold"
                    >
                      Full Name
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="FirstName"
                      placeholder="First Name"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      defaultValue={user.FullName}
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
                      name="Email"
                      placeholder="Email"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      defaultValue={user.Email}
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
                      id="phNum"
                      name="PhnNum"
                      placeholder="Phone Number"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      defaultValue={user.PhnNum}
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
                      name="UserName"
                      placeholder="User Name"
                      defaultValue={user.UserName}
                      className="border border-gray-300 p-2 my-1 rounded w-full"
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
                      name="Contact"
                      placeholder="Contact"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      defaultValue={user.Contact}
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
                      name="Address"
                      placeholder="Address"
                      className="border border-gray-300 p-2 rounded w-full"
                      defaultValue={user.Address}
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
                      name="District"
                      placeholder="district"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      defaultValue={user.District}
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
                      name="DefHouseNum"
                      placeholder="House Number"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      defaultValue={user.DefHouseNum}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <span className="text-md font-semibold ">Upload Image:</span>
                  <input
                    type="file"
                    id="uploadImage"
                    name="UserImage"
                    className=" p-2 my-1  w-full "
                  ></input>
                </div>

                <div className="col-span-3 mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    edit
                  </button>
                  <button
                    type="button"
                    className="border border-red-500 text-red-500 hover:text-white hover:underline hover:bg-red-500 font-bold py-2 px-4 rounded"
                    onClick={onCloseModal}
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
};

export default Edit;
