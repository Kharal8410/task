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
import EditUser from "../EditUser";
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
    <div className="container w-9/12 mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <TableContainer component={Paper}>
        <Table aria-label="simple table" className="min-w-full">
          <TableHead className="bg-blue-500">
            <TableRow>
              <TableCell>
                <span className="text-white text-lg">S.N.</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white text-lg">User Name</span>
              </TableCell>
              <TableCell>
                <span className="text-white text-lg">User ID</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white text-lg">House Number</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white text-lg">User Verification</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white text-lg">Allow App</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white text-lg">Status</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white text-lg">Action</span>
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
                      <TableCell align="center">{user.UserName}</TableCell>
                      <TableCell align="center">{user.MemID}</TableCell>
                      <TableCell align="center">{user.DefHouseNum}</TableCell>
                      <TableCell align="center">
                        <button
                          onClick={() => {
                            handleUserVerificationChange(user);
                            setUserVerificationChange(user);
                          }}
                          className="bg-green-700 text-white p-2 rounded-xl"
                        >
                          {user.IsVerified === "Y"
                            ? "Verified"
                            : "Not verified"}
                        </button>
                      </TableCell>
                      <TableCell align="center">
                        <button
                          onClick={() => {
                            handleAllowAppChange(user);
                            setAllowAppChange(user);
                          }}
                          className="bg-green-700 text-white p-2 rounded-xl"
                        >
                          {user.IsAllow === "Y" ? "Allow" : "Not Allowed"}
                        </button>
                      </TableCell>
                      <TableCell align="center">
                        <button
                          onClick={() => {
                            handleStatusChange(user);
                            setStatusChange(user);
                          }}
                          className="bg-green-700 text-white p-2 rounded-xl"
                        >
                          {user.IsActive === "A" ? "Active" : "Not Active"}
                        </button>
                      </TableCell>
                      <TableCell>
                        <EditUser />

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
        <Stack
          spacing={4}
          className="grid place-items-center mt-4 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24"
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
      </TableContainer>
    </div>
  );
}

export default TableComponent;
