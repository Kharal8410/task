import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from "../../../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValue = {
    name: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmitting(true);
  };

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Username is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      fetch("https://testing.esnep.com/happyhomes/api/login", {
        method: "POST",
        body: JSON.stringify({
          UserName: formValues.name,
          Password: formValues.password,
          Source: "D",
          Device: "W",
          NotToken: "",
          IsAllow: "",
          AuthCode: "r1d3r",
          IsVerified: "Y",
          Type: "POST",
        }),
        headers: {
          "Content-Type": "application/json",
          Signature: "p0m76",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.StatusCode === 200) {
            const postResult = data.Values[0];
            // console.log(postResult);

            setIsSubmitting(false);
            if (postResult.UserType === "S") {
              localStorage.setItem("userInfo", JSON.stringify(postResult));
              sessionStorage.setItem("userInfo", JSON.stringify(postResult));
              login(postResult);
              setIsSubmitting(false);
              navigate("/dashboard");
            } else {
              toast.error("User not authorized");
              setIsSubmitting(false);
            }
            // if (postResult.IsAllow === "N") {
            //   localStorage.setItem("userInfo", JSON.stringify(postResult));
            //   sessionStorage.setItem("userInfo", JSON.stringify(postResult));
            //   login(postResult);
            //   setIsSubmitting(false);
            // } else {
            //   toast.error("User not verified");
            // }
          } else {
            setIsSubmitting(false);
            toast.error("Invalid username or password");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsSubmitting(false);
          toast.error("An error occurred. Please try again later.");
        });
    }
  }, [
    formErrors,
    formValues.name,
    formValues.password,
    isSubmitting,
    login,
    navigate,
  ]);

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
              name="name"
              placeholder="Type your username"
              className="p-2 border rounded-md w-full"
              value={formValues.name}
              onChange={handleChange}
              required
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}
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
              name="password"
              placeholder="Type your password"
              className="p-2 border rounded-md w-full"
              value={formValues.password}
              onChange={handleChange}
              required
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}
          </div>
          <p href="#" className="text-right text-sm  block mb-3">
            Forgot Password?
          </p>
          <div>
            <button
              type="submit"
              className="border-2 p-2 w-full text-white bg-gradient-to-r from-blue-500 to-pink-400 rounded-md hover:from-pink-500 hover:to-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
