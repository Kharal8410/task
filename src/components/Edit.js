import React, { useContext, useEffect } from "react";
import CloseIcon from "./../images/CloseIcon.svg";
import Plus from "./../images/Plus.png";
import $ from "jquery";
import UserContext from "../context/userState/UserContext";

const EditUser = ({ setEditPop, editPop }) => {
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
    allow,
    setAllow,
    verified,
    setVerified,
  } = useContext(UserContext);

  useEffect(() => {
    if (editPop) {
      $(".editUserPopBg").fadeIn(500);
      $(".editUserPop").slideDown(500);
    }
  }, [editPop]);

  const handleChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setUserValues({ ...userValues, [name]: value });
  };

  const handleAllowChange = (e) => {
    setAllow(!allow);
  };
  const handleVerifyChange = (e) => {
    setVerified(!verified);
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

  const closePopUp = (e) => {
    setEditPop(false);
    $(".editUserPopBg").fadeOut(500);
    $(".editUserPop").slideUp(500);
    setFormErrors({});
    setEditSubmit(false);
    setUserValues(initialValue);
    setIsUploaded(false);
    setImage("");
    setAllow(false);
    setVerified(false);
  };

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
  return (
    <>
      <div className="popup-bg editUserPopBg">
        <div className="popup editUserPop">
          <div className="popup-head">
            <div className="popUpTitle">Edit</div>
            <div className="popUpClose">
              <img
                className="popUpCloseIcon"
                src={CloseIcon}
                alt="CloseIcon"
                onClick={closePopUp}
              />
            </div>
          </div>

          <div className="popup-body p-3 editPopBody">
            <div className="form__wrapper">
              <div className="row  ">
                <div className="col-md-4 wrapper">
                  <div className="form-group">
                    <label htmlFor="firstname">
                      First Name
                      <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <input
                      id="firstname"
                      type="text"
                      name="firstname"
                      className="form-control "
                      onChange={handleChange}
                      value={userValues.firstname}
                    />
                    {formErrors.firstname && (
                      <p className="errormsg">{formErrors.firstname}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-4 wrapper">
                  <div className="form-group">
                    <label htmlFor="middlename">Middle Name</label>
                    <input
                      id="middlename"
                      type="text"
                      name="middlename"
                      className="form-control "
                      onChange={handleChange}
                      value={userValues.middlename}
                    />
                  </div>
                </div>
                <div className="col-md-4 wrapper">
                  <div className="form-group">
                    <label htmlFor="lastname">
                      Last Name
                      <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      name="lastname"
                      className="form-control "
                      onChange={handleChange}
                      value={userValues.lastname}
                    />
                  </div>
                </div>
              </div>

              <div className="row  ">
                <div className="col-md-4 wrapper">
                  <div className="form-group">
                    <label htmlFor="email">
                      Email
                      <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="form-control "
                      onChange={handleChange}
                      value={userValues.email}
                    />
                    {formErrors.email && (
                      <p className="errormsg">{formErrors.email}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-4 wrapper">
                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone Number
                      <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      className="form-control "
                      onChange={handleChange}
                      value={userValues.phone}
                    />
                    {formErrors.phone && (
                      <p className="errormsg">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-4 wrapper">
                  <div className="form-group">
                    <label htmlFor="username">
                      Username
                      <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      className="form-control "
                      onChange={handleChange}
                      value={userValues.username}
                    />
                    {formErrors.username && (
                      <p className="errormsg">{formErrors.username}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="row  ">
                <div className="col-md-4 wrapper">
                  <div className="form-group">
                    <label htmlFor="contact">Contact</label>
                    <input
                      id="contact"
                      type="text"
                      name="contact"
                      className="form-control "
                      onChange={handleChange}
                      value={userValues.contact}
                    />
                  </div>
                </div>
                <div className="col-md-4 wrapper">
                  <div className="form-group">
                    <label htmlFor="address">
                      Address
                      <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <input
                      id="address"
                      type="text"
                      name="address"
                      className="form-control "
                      onChange={handleChange}
                      value={userValues.address}
                    />
                    {formErrors.address && (
                      <p className="errormsg">{formErrors.address}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-4 wrapper">
                  <div className="form-group">
                    <label htmlFor="district">
                      District
                      <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <input
                      id="district"
                      type="text"
                      name="district"
                      className="form-control "
                      onChange={handleChange}
                      value={userValues.district}
                    />
                    {formErrors.district && (
                      <p className="errormsg">{formErrors.district}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 wrapper">
                  <div className="form-group">
                    <label htmlFor="defHouseNum">House Number</label>
                    <input
                      id="defHouseNum"
                      type="text"
                      name="defHouseNum"
                      className="form-control "
                      onChange={handleChange}
                      value={userValues.defHouseNum}
                    />
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="form-group wrapper ">
                  <div
                    className="form-label"
                    htmlFor="text"
                    style={{ fontSize: "12px", textAlign: "left" }}
                  >
                    Upload Image
                  </div>

                  <div className="BoxUpload">
                    <div className="image-upload">
                      {!isUploaded ? (
                        <>
                          <label htmlFor="upload-input">
                            <img
                              src={Plus}
                              draggable={"false"}
                              alt="placeholder"
                              style={{
                                width: 90,
                                height: 100,
                                paddingTop: "10px",
                              }}
                            />
                          </label>

                          <input
                            id="upload-input"
                            type="file"
                            accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                            onChange={handleImageChange}
                            name="image"
                          />
                        </>
                      ) : (
                        <div className="ImagePreview">
                          <img
                            className="close-icon"
                            src={CloseIcon}
                            alt="CloseIcon"
                            onClick={() => {
                              setIsUploaded(false);
                              setImage(null);
                            }}
                          />

                          <img
                            id="uploaded-image"
                            src={image}
                            draggable={false}
                            alt="uploaded-img"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="allow"
                    name="allow"
                    onChange={handleAllowChange}
                    checked={allow}
                    style={{ marginTop: "10px", cursor: "pointer" }}
                  />
                  <label
                    class="form-check-label ms-1"
                    for="allow"
                    style={{
                      fontSize: "14px",
                      marginTop: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Allow
                  </label>
                </div>
                <div className=" ">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="verified"
                    name="verified"
                    onChange={handleVerifyChange}
                    checked={verified}
                    style={{ marginTop: "10px", cursor: "pointer" }}
                  />
                  <label
                    class="form-check-label ms-1"
                    for="verified"
                    style={{
                      fontSize: "14px",
                      marginTop: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Verify
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="popup-footer">
            <div className="row  mt-1 mb-1">
              <div>
                <button
                  type="button"
                  className="btn btn-sm me-2"
                  style={{ background: "#4681c3", color: "white" }}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-danger me-3"
                  style={{ color: "white" }}
                  onClick={closePopUp}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
