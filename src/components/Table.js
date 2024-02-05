import { useState, useEffect } from "react";
import { GrPowerReset } from "react-icons/gr";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import Edit from "./EditUser/Edit";
function TableComponent({
  filterIsVerified,
  filterIsAllow,
  handleUserVerificationChange,
  handleStatusChange,
  handleAllowAppChange,
}) {
  const [responseData, setResponseData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [userVerificationChange, setUserVerificationChange] = useState(null);
  const [statusChange, setStatusChange] = useState(null);
  const [allowAppChange, setAllowAppChange] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://testing.esnep.com/happyhomes/api/admin/user";
        const data = {
          UserID: "-1",
          Flag: "S",
          IsAllow: "-1",
          IsVerified: "-1",
          UserType: "O",
          AuthCode: "r1d3r",
        };
        const signature = "p0m76";

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            signature: signature,
          },
          body: JSON.stringify({ ...data, Signature: signature }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        setResponseData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [userVerificationChange, statusChange, allowAppChange]);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    responseData &&
    responseData.Values.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" className="">
          <TableHead className="bg-blue-500">
            <TableRow>
              <TableCell>
                <span className="text-white text-md font-bold ">S.N.</span>
              </TableCell>
              <TableCell align="left">
                <span className="text-white text-md font-bold ">User Name</span>
              </TableCell>
              <TableCell>
                <span className="text-white text-md font-bold ">UserID</span>
              </TableCell>

              <TableCell align="left">
                <span className="text-white text-md font-bold ">House Num</span>
              </TableCell>
              <TableCell align="left">
                <span className="text-white text-md font-bold ">
                  User Verification
                </span>
              </TableCell>
              <TableCell align="left">
                <span className="text-white text-md font-bold ">Allow App</span>
              </TableCell>
              <TableCell align="left">
                <span className="text-white text-md font-bold "> Status </span>
              </TableCell>
              <TableCell align="left">
                <span className="text-white text-md font-bold "> Action </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems &&
              currentItems.map((user, index) => {
                const isVerifiedMatch =
                  filterIsVerified === "-1" ||
                  user.IsVerified === filterIsVerified;
                const isAllowMatch =
                  filterIsAllow === "-1" || user.IsAllow === filterIsAllow;

                if (isVerifiedMatch && isAllowMatch) {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="left">{user.UserName}</TableCell>
                      <TableCell align="left">{user.MemID}</TableCell>
                      <TableCell align="left">{user.DefHouseNum}</TableCell>
                      <TableCell align="left">
                        <button
                          onClick={() => {
                            handleUserVerificationChange(user);
                            setUserVerificationChange(user);
                          }}
                          className="bg-green-700 text-white p-1  rounded-xl"
                        >
                          {user.IsVerified === "Y"
                            ? "Verified"
                            : "Not verified"}
                        </button>
                      </TableCell>
                      <TableCell align="left">
                        <button
                          onClick={() => {
                            handleAllowAppChange(user);
                            setAllowAppChange(user);
                          }}
                          className="bg-green-700 text-white p-1 rounded-xl"
                        >
                          {user.IsAllow === "Y" ? "Allow" : "Not Allowed"}
                        </button>
                      </TableCell>
                      <TableCell align="left">
                        <button
                          onClick={() => {
                            handleStatusChange(user);
                            setStatusChange(user);
                          }}
                          className="bg-green-700 text-white p-1  rounded-xl"
                        >
                          {user.IsActive === "A" ? "Active" : "Not Active"}
                        </button>
                      </TableCell>
                      <TableCell>
                        <Edit userID={user.MemID} />

                        <button
                          type="button"
                          className="bg-blue-500 p-1 rounded-lg text-white text-lg mx-2 "
                        >
                          <GrPowerReset />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                }

                return null;
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        spacing={4}
        className="grid place-items-center mt-4 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 "
      >
        <Pagination
          count={Math.ceil((responseData?.Values.length || 0) / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </>
  );
}

export default TableComponent;
