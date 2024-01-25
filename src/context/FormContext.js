// import React, { createContext, useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const FormContext = createContext();

// export const FormProvider = ({ children }) => {
//   const [formData, setFormData] = useState({
//     UserID: "",
//     Flag: "I",
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
//     IsAllow: "Y",
//     IsVerified: "Y",
//     BranchID: "",
//     FiscalID: "",
//     AuthCode: "r1d3r",
//   });

//   useEffect(() => {
//     const fetchForm = async () => {
//       try {
//         const url = "https://testing.esnep.com/happyhomes/api/check-session";
//         const response = await fetch(url, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Signature: "p0m76",
//           },
//           body: JSON.stringify(formData),
//         });

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setFormData(data);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     fetchForm();
//   }, []);

//   return (
//     <FormContext.Provider value={{ formData, setFormData }}>
//       {children}
//     </FormContext.Provider>
//   );
// };

// export const useForm = () => {
//   const context = useContext(FormContext);

//   if (!context) {
//     throw new Error("useForm must be used within a FormProvider");
//   }

//   return context;
// };
