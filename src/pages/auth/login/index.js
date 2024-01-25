import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      UserName: "huncha",
      Password: "huncha",
      Source: "D",
      Device: "A",
      NotToken: "eee",
    };

    try {
      const response = await fetch(
        "https://testing.esnep.com/happyhomes/api/admin/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Signature: "p0m76",
          },
          body: JSON.stringify(credentials),
        }
      );
      //   const Values = await response.json();
      if (response.ok) {
        toast.success("Login successfully");
        navigate("/dashboard");
      } else {
        toast.error("Incorrect username or password");
      }
    } catch (error) {
      toast.error("Error during login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="w-[27%] m-auto p-4 border-t-4 border-pink-500 shadow-md rounded-md bg-slate-100 "
        onSubmit={handleLogin}
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
