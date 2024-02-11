import React from "react";

const PageNotFound = () => {
  return (
    <>
      <div className="flex flex-row gap-3 p-1 m-1">
        <div>Page Not Found...</div>
        <span>
          {" "}
          Click here to login
          <a href="/" className="text-sm text-blue-500 underline ">
            Login{" "}
          </a>
        </span>
      </div>
    </>
  );
};

export default PageNotFound;
