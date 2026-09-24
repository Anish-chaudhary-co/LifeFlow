import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/AuthContext";
import Notification from "./notification";
const signIn = () => {
  const { setNotification } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost/LifeFlow/Blood-Donation/BackEnd/auth/signIn.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(login),
        },
      );

      const text = await response.text();
      let data = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(
            "Server returned an invalid response. Check PHP backend.",
          );
        }
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      setNotification(data);

      if (data.success) {
        setUser(data);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      alert(error.message || "Unable to connect to the database.");
    }
  };
  return (
    <>
      <div className="m-2 mt-9">
        <Notification />
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-bold">Welcome back</h1>
          <span className="text-gray-400">
            Sign in to access your dashboard
          </span>
        </div>
        <div className="flex flex-col md:justify-center mt-10 md:mt-20 md:items-center">
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col border border-slate-200 rounded-lg shadow-2xl gap-8 p-4 md:w-97"
          >
            <div className="flex flex-col gap-2 ">
              Email
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="you@gexample.com"
                className="border border-gray-300 p-2 rounded-xl h-9 "
              />
            </div>
            <div className="flex flex-col gap-2">
              Password
              <input
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Enter your password"
                className="border border-gray-300 p-2 rounded-xl h-9 "
              />
            </div>

            <input
              type="submit"
              value="Sign In"
              className="font-bold p-2 rounded-xl bg-rose-600 text-white"
            />
          </form>

          {/* this is for login with google and facebook */}

          {/* <div className="flex items-center gap-2">
            <hr className="flex-1 border-t-[0.5px] border-gray-400" />
            <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
            <hr className="flex-1 border-t-[0.5px] border-gray-400" />
          </div>

          <div className="flex gap-8 justify-center mt-6">
            <button className="flex gap-2 items-center border border-gray-300 px-6 py-2 text-center rounded-2xl">
              <FaGoogle className="text-red-600" />
              Google
            </button>
            <button className="flex gap-2 items-center border border-gray-300 px-6 py-2 text-center rounded-2xl">
              <FaFacebook className="text-blue-500" />
              FaceBook
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default signIn;
