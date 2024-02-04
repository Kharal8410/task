import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from "../../../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const initialValue = {
    name: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(initialValue);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(formValue));
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      const dataForm = {
        UserName: formValue.name,
        Password: formValue.password,
        Source: "D",
        Device: "W",
        NotToken: "",
        AuthCode: "r1d3r",
        Type: "POST",
        FetchUrl: `https://testing.esnep.com/happyhomes/api/login`,
      };
      fetch(dataForm).then(function (result) {
        if (result.StatusCode === 200) {
          const postResult = result.Values[0];

          setIsSubmit(false);
          if (postResult.UserType === "S") {
            localStorage.setItem("userInfo", JSON.stringify(postResult));
            sessionStorage.setItem("userInfo", JSON.stringify(postResult));
            login(postResult);
            setIsSubmit(false);

            navigate("/dashboard");
          } else {
            toast.error("user not authorized");
            setIsSubmit(false);
          }
        } else {
          setIsSubmit(false);
        }
      });
    }
  }, [formError]);

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="w-[27%] m-auto p-4 border-t-4 border-pink-500 shadow-md rounded-md bg-slate-100 "
        onSubmit={handleSubmit}
      >
        <Toaster />
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <div className="mb-4">
          <div className="mb-3">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>

            <input
              type="text"
              id="userName"
              placeholder="Type your username"
              className="p-2 border rounded-md w-full"
              // value={formValue.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Type your password"
              className="p-2 border rounded-md w-full"
              // value={formValue.password}
              onChange={handleChange}
              required
            />
          </div>
          <p href="#" className="text-right text-sm  block mb-3">
            Forgot Password?
          </p>
          <div>
            <button
              type="submit"
              className="border-2 p-2 w-full text-white bg-gradient-to-r from-blue-500 to-pink-400 rounded-md hover:from-pink-500 hover:to-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
