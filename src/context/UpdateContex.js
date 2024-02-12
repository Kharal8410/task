import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [updateUser, setUpdateUser] = useState({
    AuthCode: "r1d3r",
    UserID: "",
    Flag: "U",
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

  const contextValue = {
    updateUser,
    setUpdateUser,
  };
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
