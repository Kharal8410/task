import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import UserContext from "./UserContext";
import { Fetchdata } from "../../components/hooks/getData";

function UserState(props, { user }) {
  const initialValue = {
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    contact: "",
    phone: "",
    address: "",
    district: "",
    defHouseNum: "",
  };

  const [userValues, setUserValues] = useState(initialValue);

  const [formErrors, setFormErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const [editSubmit, setEditSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUploaded, setIsUploaded] = useState(false);
  const [typeFile, setTypeFile] = useState("");
  const [image, setImage] = useState("");
  const [allow, setAllow] = useState(false);
  const [verified, setVerified] = useState(false);
  const [originalList, setOriginalList] = useState(null);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    userLst();
  }, []);

  const userLst = () => {
    const params = {
      UserID: "-1",
      Flag: "S",
      IsAllow: "-1",
      IsVerified: "-1",
      UserType: "O",
      AuthCode: "r1d3r",
      FetchURL: `https://testing.esnep.com/happyhomes/api/admin/user`,
      Type: "POST",
    };

    Fetchdata(params).then(function (resp) {
      if (resp.StatusCode === 200) {
        const postResult = resp.Values ? resp.Values : "";
        setUserList(postResult);
        setOriginalList(postResult);
        setLoading(false);
      } else {
        setUserList([]);
        setOriginalList([]);
        setLoading(false);
      }
    });
  };

  // to edit and view Todo

  const [perID, setPerId] = useState("");
  const [viewPop, setViewPop] = useState(false);
  const [viewList, setViewList] = useState(false);

  const handleEdit = (data) => {
    setPerId(data.MemID);
    info();
  };

  const handleView = (data) => {
    setPerId(data.MemID);
    setViewPop(true);
  };

  useEffect(() => {
    info();
  }, [perID]);

  const info = () => {
    const params = {
      UserID: "-1",
      Flag: "SI",
      MemID: perID.toString(),
      AuthCode: "r1d3r",
      FetchURL: `https://testing.esnep.com/happyhomes/api/admin/user`,
      Type: "POST",
    };

    Fetchdata(params).then(function (resp) {
      if (resp.StatusCode === 200) {
        const data = resp.Values ? resp.Values[0] : "";
        setViewList(data);
        setUserValues({
          firstname: data.FirstName,
          middlename: data.MiddleName,
          lastname: data.LastName,
          username: data.UserName,
          email: data.Email,
          contact: data.Contact,
          phone: data.PhnNum,
          address: data.Address,
          district: data.DistrictID,
          defHouseNum: data.DefHouseNum,
        });
        setImage(data.UserImage);
        setAllow(data.IsAllow === "Y" ? true : false);
        setVerified(data.IsVerified === "Y" ? true : false);
      } else {
        setViewList([]);
      }
    });
  };

  const editData = () => {
    const dataForm = {
      UserID: "-1",
      Flag: "U",
      UserName: userValues.username,
      FirstName: userValues.firstname,
      MiddleName: userValues.middlename,
      LastName: userValues.lastname,
      UserType: "O",
      Password: userValues.password,
      // UserImage: image !== null ? image.split(",")[1] : "",
      Email: userValues.email,
      Contact: userValues.contact,
      PhnNum: userValues.phone,
      Address: userValues.address,
      District: userValues.district,
      DefHouseNum: userValues.defHouseNum,
      IsAllow: allow ? "Y" : "N",
      IsVerified: verified ? "Y" : "N",
      BranchID: "1",
      FiscalID: "1",
      MemID: perID.toString(),
      AuthCode: "r1d3r",
      FetchURL: `https://testing.esnep.com/happyhomes/api/admin/user`,
      Type: "POST",
    };
    Fetchdata(dataForm).then(function (resp) {
      if (resp.StatusCode === 200) {
        setUserValues(initialValue);
        setAllow(false);
        setVerified(false);
        setIsUploaded(false);
        setImage("");
        userLst();
        info();

        toast.success(resp.Message, {
          style: {
            color: "green",
            fontSize: "13px",
          },
          theme: "light",
        });
      } else {
        toast.error("Error: " + resp.Message, {
          style: {
            color: "red",
            fontSize: "13px",
          },
          theme: "light",
        });
      }
    });
  };

  return (
    <UserContext.Provider
      value={{
        userValues,
        setUserValues,
        initialValue,
        formErrors,
        setFormErrors,
        submit,
        setSubmit,
        userList,
        setUserList,
        loading,
        setLoading,
        userLst,
        editSubmit,
        setEditSubmit,
        originalList,
        setOriginalList,
        handleView,
        perID,
        setPerId,

        viewPop,
        setViewPop,
        viewList,
        setViewList,
        handleEdit,
        editData,
        isUploaded,
        setIsUploaded,
        typeFile,
        setTypeFile,
        image,
        setImage,
        allow,
        setAllow,
        verified,
        setVerified,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
export default UserState;
