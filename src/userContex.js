// import { createContext, useState } from "react";

// export const UserContext = createContext();

// const UserContextProvider = (props) => {
//   const [user, setUser] = useState({
//     AuthCode: "r1d3r",
//     Flag: "i",
//     AgentCode: "",
//     AgentID: "",
//     FullName: "",
//     UserName: "",
//     Password: "",
//     Image: "",
//     Address: "",
//     District: "",
//     StarGrading: "",
//     Academic: "",
//     Professional: "",
//     WorkExp: "",
//     ResponseTime: "",
//     ProductCat: "",
//     ProductType: "",
//     Statement: "",
//     Contact: "",
//     AllowApp: "N",
//   });

//   const [updateUser, setUpdateUser] = useState({
//     AuthCode: "r1d3r",
//     UserID: "",
//     Flag: "",
//     UserName: "",
//     FirstName: "",
//     MiddleName: "",
//     LastName: "",
//     UserType: "O",
//     Password: "",
//     UserImage: "",
//     Email: "",
//     Contact: "",
//     PhnNum: "",
//     Address: "",
//     District: "",
//     DefHouseNum: "",
//     IsAllow: "N",
//     IsVerified: "N",
//     BranchID: "",
//     FiscalID: "",
//     MemID: "",
//   });

//   const [userInfo, setUserInfo] = useState({
//     AgentID: "",
//     FullName: "",
//     UserName: "",
//     AgentCode: "",
//     Image: "",
//     Address: "",
//     District: "",
//     GradingRate: "",
//     Academic: "",
//     Professional: "",
//     WorkExp: "",
//     ResponseTime: "",
//     ProdCategory: "",
//     ProdType: "",
//     Statement: "",
//     Contact: "",
//     CreatedDate: "",
//   });

//   const contextValue = {
//     user,
//     setUser,
//     updateUser,
//     setUpdateUser,
//     userInfo,
//     setUserInfo,
//   };
//   return (
//     <UserContext.Provider value={contextValue}>
//       {props.children}
//     </UserContext.Provider>
//   );
// };

// export default UserContextProvider;
