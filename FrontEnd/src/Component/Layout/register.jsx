import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

const register = () => {
  const [selected, setSelected] = useState("");
  const roles = ["Patient", "Donor", "Hospital"];
  return (
    <div className="flex flex-col justify-center items-center gap-9">
      <div>
        <h1 className="text-3xl font-bold">Create your account</h1>
        <span className="text-gray-400 text-sm">
          Choose your role to get started
        </span>
      </div>

      {/* <div className="flex gap-8">
        <div className="px-4 py-4 rounded-xl text-center border border-gray-400">
          Donor
        </div>
        <div className="px-4 py-4 rounded-xl text-center border border-gray-400">
          Patient
        </div>
        <div className="px-4 py-4 rounded-xl text-center border border-gray-400">
          Hospital
        </div>
      </div> */}
      <div className="flex gap-8">
        {roles.map((items) => (
          <div
            key={items}
            onClick={() => setSelected(items)}
            className={`px-4 py-4 rounded-xl text-center border border-gray-400 cursor-pointer ${selected == items ? "text-rose-500 bg-rose-300" : "bg-white text-black"}`}
          >
            {items}
          </div>
        ))}
      </div>

      {/* register form */}

      <form action="" className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          Full Name
          <input
            type="text"
            placeholder="Enter your fullname"
            className="border px-4 py-2 md:w-97 border-gray-400 rounded-2xl"
          />
        </div>
        <div className="flex flex-col gap-2">
          Email
          <input
            type="email"
            placeholder="Enter you Email"
            className="border px-4 py-2 md:w-97 border-gray-400 rounded-2xl"
          />
        </div>
        <div className="flex flex-col gap-2">
          Password
          <input
            type="password"
            placeholder="Enter password"
            className="border px-4 py-2 md:w-97 border-gray-400 rounded-2xl"
          />
        </div>
        <div className="flex flex-col gap-2">
          Re-password
          <input
            type="password"
            placeholder="Re-enter password"
            className="border px-4 py-2 md:w-97 border-gray-400 rounded-2xl"
          />
        </div>

        <input
          type="submit"
          value="Create account"
          className="border py-2 rounded-xl bg-rose-500 text-white font-bold hover:bg-rose-400"
        />

        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <hr className="flex-1" />
          <span>OR CONTINUE WITH</span>
          <hr className="flex-1" />
        </div>

        <div className="flex gap-8 justify-center">
          <button className="flex gap-2 items-center border border-gray-300 px-6 py-2 text-center rounded-2xl">
            <FaGoogle className="text-red-600 hover:bg-rose-500 hover:text-white" />
            Google
          </button>
          <button className="flex gap-2 items-center border border-gray-300 px-6 py-2 text-center rounded-2xl">
            <FaFacebook className="text-blue-500 hover:bg-rose-500 hover:text-white" />
            FaceBook
          </button>
        </div>
      </form>
    </div>
  );
};

export default register;
