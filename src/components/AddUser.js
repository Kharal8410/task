import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";

function PopupComponent() {
  const [openModal, setOpenModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [formData, setFormData] = useState({
    UserID: "",
    Flag: "I",
    UserName: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    UserType: "O",
    Password: "",
    UserImage: "",
    Email: "",
    Contact: "",
    PhnNum: "",
    Address: "",
    District: "",
    DefHouseNum: "",
    IsAllow: "Y",
    IsVerified: "Y",
    BranchID: "",
    FiscalID: "",
    AuthCode: "r1d3r",
  });

  function onCloseModal() {
    setOpenModal(false);
    setImageSrc(null);
  }

  const addImage = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageDataUrl = reader.result;
          setImageSrc(imageDataUrl);
        };
        reader.readAsDataURL(file);
      }
    });

    fileInput.click();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (imageSrc) {
      const base64Data = imageSrc.split(",")[1];
      const updatedFormData = {
        ...formData,
        UserImage: base64Data,
      };
      await postData(updatedFormData);
    } else {
      let districtValue = "";
      switch (formData.District) {
        case "Kathmandu":
          districtValue = "1";
          break;
        case "Chitwan":
          districtValue = "2";
          break;
        case "Nawalpur":
          districtValue = "3";
          break;
        default:
          districtValue = "";
          break;
      }

      const updatedFormData = {
        ...formData,
        District: districtValue,
      };

      await postData(updatedFormData);
    }
  };

  async function postData(formData) {
    try {
      const url = "https://testing.esnep.com/happyhomes/api/admin/user";
      const signature = "p0m76";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Signature: signature,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("User added successfully");
        onCloseModal();
      } else {
        toast.error("Failed to add user");
      }
    } catch (error) {
      toast.error("Error posting data");
    }
  }

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => setOpenModal(true)}
      >
        Add User
      </button>
      <Toaster />

      {openModal && (
        <form onSubmit={handleFormSubmit}>
          <div className="fixed inset-0 grid place-items-center ">
            <div
              className="bg-black opacity-50 absolute inset-0"
              onClick={onCloseModal}
            ></div>

            <div className="bg-slate-100 w-7/12  rounded-md shadow-lg  relative  ">
              <div className="bg-blue-500 col-span-3 mb-4 flex justify-between p-4">
                <h3 className="text-3xl font-bold text-white ">Add Owner</h3>
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
                      First Name
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      value={formData.FirstName}
                      onChange={(e) =>
                        setFormData({ ...formData, FirstName: e.target.value })
                      }
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
                      value={formData.MiddleName}
                      onChange={(e) =>
                        setFormData({ ...formData, MiddleName: e.target.value })
                      }
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
                      value={formData.LastName}
                      onChange={(e) =>
                        setFormData({ ...formData, LastName: e.target.value })
                      }
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
                      value={formData.Email}
                      onChange={(e) =>
                        setFormData({ ...formData, Email: e.target.value })
                      }
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
                      value={formData.PhnNum}
                      onChange={(e) =>
                        setFormData({ ...formData, PhnNum: e.target.value })
                      }
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
                      value={formData.UserName}
                      onChange={(e) =>
                        setFormData({ ...formData, UserName: e.target.value })
                      }
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
                      value={formData.Password}
                      onChange={(e) =>
                        setFormData({ ...formData, Password: e.target.value })
                      }
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
                      value={formData.Contact}
                      onChange={(e) =>
                        setFormData({ ...formData, Contact: e.target.value })
                      }
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
                      value={formData.Address}
                      onChange={(e) =>
                        setFormData({ ...formData, Address: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="district" className="text-md font-semibold">
                      District
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <select
                      id="district"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      value={formData.District}
                      onChange={(e) =>
                        setFormData({ ...formData, District: e.target.value })
                      }
                      required
                    >
                      <option value="">Select District</option>
                      <option value="Kathmandu">Kathmandu</option>
                      <option value="Chitwan">Chitwan</option>
                      <option value="Nawalpur">Nawalpur</option>
                    </select>
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
                      value={formData.DefHouseNum}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          DefHouseNum: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <span className="text-md font-semibold ">Upload Image:</span>
                  <div className="w-full  md:w-44 border-2 border-black   grid place-items-center rounded mt-1">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt="Selected"
                        id="image"
                        className="w-full h-auto"
                      />
                    ) : (
                      <span
                        onClick={addImage}
                        className="text-5xl sm:text-4xl md:text-6xl lg:text-8xl text-blue-500 font-extralight"
                      >
                        <AiOutlinePlus />
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-span-3 mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-800 hover:underline text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Add
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
}

export default PopupComponent;
