import React, { useContext, useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import UserContext from "../context/userState/UserContext";
import Close from "../images/CloseIcon.svg";
import { AiOutlinePlus } from "react-icons/ai";

const EditUser = () => {
  const [openModal, setOpenModal] = useState(false);
  const {
    userValues,
    setUserValues,
    formErrors,
    setFormErrors,
    editSubmit,
    setEditSubmit,
    editData,
    initialValue,
    isUploaded,
    setIsUploaded,
    // typeFile,
    setTypeFile,
    image,
    setImage,
  } = useContext(UserContext);
  const districtNames = {
    1: "Kathmandu",
    2: "Chitwan",
    3: "Nawalpur",
  };

  const handleChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const name = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;

    if (name === "district") {
      const districtKey = Object.keys(districtNames).find(
        (key) => districtNames[key] === value
      );
      value = districtKey ? districtKey : value;
    }

    setUserValues({ ...userValues, [name]: value });
  };

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setTypeFile(e.target.files[0].type);
      let reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const validate = (values) => {
    const errors = {};
    const numv = /^[0-9]+$/i;
    const digits = /^\d{10}$/;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.firstname) {
      errors.firstname = "Required";
    }
    if (!values.lastname) {
      errors.lastname = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format";
    }

    if (!values.phone) {
      errors.phone = "Required";
    } else if (!numv.test(values.phone)) {
      errors.phone = "Must be digits";
    } else if (!digits.test(values.phone)) {
      errors.phone = "Must be 10 digits";
    }
    if (!values.username) {
      errors.username = "Required";
    }
    if (!values.address) {
      errors.address = "Required";
    }
    if (!values.district) {
      errors.district = "Required";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(userValues));
    setEditSubmit(true);
    //  setOpenModal(false);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && editSubmit) {
      editData(userValues);
      setEditSubmit(false);
    }
  }, [formErrors, editData, editSubmit, setEditSubmit, userValues]);

  const onCloseModal = () => {
    setOpenModal(false);
    setUserValues(initialValue);
  };

  return (
    <>
      <button
        className="bg-blue-500 p-1 rounded-lg text-white text-sm"
        onClick={() => setOpenModal(true)}
      >
        <RiEdit2Fill />
      </button>

      {openModal && (
        <form>
          <div className="fixed inset-0 grid place-items-center ">
            <div
              className="bg-black opacity-50 absolute inset-0"
              onClick={onCloseModal}
            ></div>

            <div className="bg-slate-100 w-7/12  rounded-md shadow-lg  relative  ">
              <div className="bg-blue-500 col-span-3 flex justify-between p-4">
                <h3 className="text-2xl font-bold text-white  ">Edit User</h3>
                <button
                  type="button"
                  className="text-2xl font-bold text-white p-2 rounded-md hover:bg-red-700"
                  onClick={onCloseModal}
                >
                  <RxCross2 />
                </button>
              </div>

              <div className="p-4 ">
                <div className="flex flex-wrap  gap-4 mb-2 overflow-y-auto h-80 lg:h-full ">
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label
                      htmlFor="firstname"
                      className="text-md font-semibold"
                    >
                      First Name
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      id="firstname"
                      type="text"
                      name="firstname"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      onChange={handleChange}
                      defaultValue={userValues.firstname}
                    />
                    {formErrors.firstname && (
                      <p className="text-red-500 ">{formErrors.firstname}</p>
                    )}
                  </div>
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label
                      htmlFor="middlename"
                      className="text-md font-semibold"
                    >
                      Middle Name
                    </label>
                    <input
                      id="middlename"
                      type="text"
                      name="middlename"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      onChange={handleChange}
                      defaultValue={userValues.middlename}
                    />
                  </div>
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="lastname" className="text-md font-semibold">
                      Last Name
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      name="lastname"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      onChange={handleChange}
                      defaultValue={userValues.lastname}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 ">{formErrors.lastname}</p>
                    )}
                  </div>

                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="email" className="text-md font-semibold">
                      Email
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      id="email"
                      type="text"
                      name="email"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      onChange={handleChange}
                      defaultValue={userValues.email}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 ">{formErrors.email}</p>
                    )}
                  </div>
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="phone" className="text-md font-semibold">
                      Phone Number
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      onChange={handleChange}
                      defaultValue={userValues.phone}
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 ">{formErrors.phone}</p>
                    )}
                  </div>
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="username" className="text-md font-semibold">
                      User Name
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      onChange={handleChange}
                      defaultValue={userValues.username}
                    />
                    {formErrors.username && (
                      <p className="text-red-500 ">{formErrors.username}</p>
                    )}
                  </div>

                  <div className="w-full lg:w-[32%] md:w-[45%] relative">
                    <label htmlFor="contact" className="text-md font-semibold">
                      Contact
                    </label>
                    <input
                      id="contact"
                      type="text"
                      name="contact"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      onChange={handleChange}
                      defaultValue={userValues.contact}
                    />
                  </div>

                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="address" className="text-md font-semibold">
                      Address
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      id="address"
                      type="text"
                      name="address"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      onChange={handleChange}
                      defaultValue={userValues.address}
                    />
                    {formErrors.address && (
                      <p className="text-red-500 ">{formErrors.address}</p>
                    )}
                  </div>

                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="district" className="text-md font-semibold">
                      District
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <select
                      id="district"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      defaultValue={userValues.district}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select District</option>
                      <option value="Kathmandu">Kathmandu</option>
                      <option value="Chitwan">Chitwan</option>
                      <option value="Nawalpur">Nawalpur</option>
                    </select>
                    {formErrors.district && (
                      <p className="text-red-500 ">{formErrors.district}</p>
                    )}
                  </div>
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label
                      htmlFor="defHouseNum"
                      className="text-md font-semibold"
                    >
                      House Number
                    </label>
                    <input
                      id="defHouseNum"
                      type="text"
                      name="defHouseNum"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      onChange={handleChange}
                      defaultValue={userValues.defHouseNum}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-[32%] md:w-[45%]">
                  <span className="text-md font-semibold ">Upload Image:</span>
                  <div className="w-full  md:w-44 border-2 border-black   grid place-items-center rounded mt-1">
                    {!isUploaded ? (
                      <>
                        <label
                          htmlFor="upload-input"
                          className="text-5xl sm:text-4xl md:text-6xl lg:text-8xl text-blue-500 font-extralight"
                        >
                          <AiOutlinePlus />
                        </label>

                        <input
                          id="upload-input"
                          type="file"
                          accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                          onChange={handleImageChange}
                          name="image"
                          className="hidden"
                        />
                      </>
                    ) : (
                      <div className="relative">
                        <img
                          className="absolute top-0 right-0 cursor-pointer"
                          src={Close}
                          alt="CloseIcon"
                          onClick={() => {
                            setIsUploaded(false);
                            setImage(null);
                          }}
                        />

                        <img
                          id="uploaded-image"
                          src={image}
                          draggable="false"
                          alt="uploaded-img"
                          className="w-24 h-24"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-span-3 mt-6 flex justify-end">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handleSubmit}
                  >
                    Edit
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

export default EditUser;
