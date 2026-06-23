import { useState } from "react";
import { NavLink } from "react-router-dom";
import SignIn from "../../Component/Layout/signIn";
import Register from "../../Component/Layout/register";

const RegisterSignIn = () => {
  // const [signIn, setSignIn] = useState(true);
  // const handleRegister = () => {
  //   setSignIn(!signIn);
  // }
  const ActivePage = "bg-white border border-gray-300";
  const NormalPage = "bg-gray-400 text-gray-600";
  return (
    <>
      <div className="mt-20 md:relative">
        <div className="flex justify-between md:absolute top-2 right-8 m-2 gap-2 bg-gray-400 border border-gray-300 p-1 rounded-2xl md:w-50">
          <NavLink
            to="signIn"
            className={({ isActive }) =>
              `text-center rounded-2xl w-45 md:w-25 border ${isActive} : ActivePage ? NormalPage `
            }
          >
            Register
          </NavLink>
          <NavLink
            to="register"
            className={({ isActive }) =>
              ` text-center rounded-2xl w-45 md:w-25 border ${isActive} : ActivePage ? NormalPage `
            }
          >
            sign in
          </NavLink>
        </div>
        {/* <SignIn /> */}
        <Register />
      </div>
    </>
  );
};

export default RegisterSignIn;
