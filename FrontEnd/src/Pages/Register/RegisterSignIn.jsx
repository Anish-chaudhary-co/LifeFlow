import { useState } from "react";
import SignIn from "../../Component/Layout/signIn";
import Register from "../../Component/Layout/register";

const RegisterSignIn = () => {
  const [register, setRegister] = useState(false);
  return (
    <>
      <div className="mt-20 md:relative">
        <div className="flex justify-between md:absolute top-2 right-8 m-2 gap-2 bg-rose-400 p-1 rounded-2xl md:w-50">
          <button
            onClick={() => setRegister(true)}
            className={`text-center rounded-2xl w-50 md:w-25 ${register == true ? "bg-rose-200 text-rose-500" : "bg-rose-400 text-gray-600"} `}
          >
            Sign in
          </button>
          <button
            onClick={() => setRegister(false)}
            className={` text-center rounded-2xl w-50 md:w-25 ${register == false ? "bg-rose-200 text-rose-500" : "bg-rose-400 text-gray-600"}`}
          >
            Register
          </button>
        </div>

        {register ? <SignIn /> : <Register />}
      </div>
    </>
  );
};

export default RegisterSignIn;
