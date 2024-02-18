import React, { useContext, useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

// import $ from "jquery";
import UserContext from "../context/userState/UserContext";

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
    // initialValue,
    // // isUploaded,
    // setIsUploaded,
    // // typeFile,
    // setTypeFile,
    // // image,
    // setImage,
    // allow,
    // setAllow,
    // verified,
    // setVerified,
  } = useContext(UserContext);

  // useEffect(() => {
  //   if (editPop) {
  //     $(".editUserPopBg").fadeIn(500);
  //     $(".editUserPop").slideDown(500);
  //   }
  // }, [editPop]);

  const handleChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setUserValues({ ...userValues, [name]: value });
  };

  // const handleAllowChange = (e) => {
  //   setAllow(!allow);
  // };
  // const handleVerifyChange = (e) => {
  //   setVerified(!verified);
  // };

  // function handleImageChange(e) {
  //   if (e.target.files && e.target.files[0]) {
  //     setTypeFile(e.target.files[0].type);
  //     let reader = new FileReader();

  //     reader.onload = function (e) {
  //       setImage(e.target.result);
  //       setIsUploaded(true);
  //     };

  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // }

  // const closePopUp = (e) => {
  //   // setEditPop(false);

  //   setFormErrors({});
  //   setEditSubmit(false);
  //   setUserValues(initialValue);
  //   setIsUploaded(false);
  //   setImage("");
  //   setAllow(false);
  //   setVerified(false);
  // };

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
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && editSubmit) {
      editData(userValues);
      setEditSubmit(false);
    }
  }, [formErrors]);
  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <button
        className="bg-blue-500 p-1 rounded-lg text-white text-sm mx-2"
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
              <div className="bg-blue-500 col-span-3 mb-4 flex justify-between p-4">
                <h3 className="text-3xl font-bold text-white  ">Edit User</h3>
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
                      id="firstname"
                      type="text"
                      name="firstname"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      onChange={handleChange}
                      value={userValues.firstname}
                    />
                    {formErrors.firstname && (
                      <p className="text-red-500 ">{formErrors.firstname}</p>
                    )}
                  </div>
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label
                      htmlFor="middleName"
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
                      value={userValues.middlename}
                    />
                  </div>
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="lastName" className="text-md font-semibold">
                      Last Name
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      name="lastname"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      onChange={handleChange}
                      value={userValues.lastname}
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
                      value={userValues.email}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 ">{formErrors.email}</p>
                    )}
                  </div>
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="phNum" className="text-md font-semibold">
                      Phone Number
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      onChange={handleChange}
                      value={userValues.phone}
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 ">{formErrors.phone}</p>
                    )}
                  </div>
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="userName" className="text-md font-semibold">
                      User Name
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      onChange={handleChange}
                      value={userValues.username}
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
                      value={userValues.contact}
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
                      value={userValues.address}
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
                    <input
                      id="district"
                      type="text"
                      name="district"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      onChange={handleChange}
                      value={userValues.district}
                    />
                    {formErrors.district && (
                      <p className="text-red-500 ">{formErrors.district}</p>
                    )}
                  </div>
                  <div className="w-full lg:w-[32%] md:w-[45%]">
                    <label htmlFor="houseNum" className="text-md font-semibold">
                      House Number
                    </label>
                    <input
                      id="defHouseNum"
                      type="text"
                      name="defHouseNum"
                      className="border border-gray-300 p-2 my-1 rounded w-full"
                      onChange={handleChange}
                      value={userValues.defHouseNum}
                    />
                  </div>
                </div>
                <div>
                  <span className="text-md font-semibold ">Upload Image:</span>
                  <input
                    type="file"
                    id="uploadImage"
                    name="UserImage"
                    className=" p-2 my-1 w-full "
                  ></input>
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
