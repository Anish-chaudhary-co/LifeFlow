import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
const signIn = () => {
  return (
    <div className="m-2 mt-9">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-bold">Welcome back</h1>
        <span className="text-gray-400">Sign in to access your dashboard</span>
      </div>
      <div className="flex flex-col md:justify-center mt-10 md:mt-20 md:items-center">
        <form action="" className="flex flex-col gap-8 p-3 md:w-97">
          <div className="flex flex-col gap-2 ">
            Email
            <input
              type="gmail"
              placeholder="you@gexample.com"
              className="border border-gray-300 p-2 rounded-xl h-9 "
            />
          </div>
          <div className="flex flex-col gap-2">
            Password
            <input
              type="password"
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

        <div className="flex items-center gap-2">
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
        </div>
      </div>
    </div>
  );
};

export default signIn;
