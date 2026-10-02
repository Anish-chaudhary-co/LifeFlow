import { useState, useContext } from "react";
import { UserPersonalContext } from "../../../Context/UserPersonalContext";

const detail = {
  fullname: "",
  DOB: "",
  gender: "",
  address: "",
  bloodGroup: "",
  contact: "",
};
const PersonalDetailForm = () => {
  const { setShowDetail } = useContext(UserPersonalContext);

  const [detailValue, setDetailValue] = useState(detail);
  console.log("this is submit button");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetailValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    setShowDetail(detailValue);
    console.log(detailValue);
  };
  return (
    <div className="border p-4 border-slate-200 rounded-2xl shadow-2xl">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-semibold">Personal Detail:</h3>
          <span className="text-slate-400 font-sans">
            Your identifying information.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div>
            Full Name
            <input
              name="fullname"
              type="text"
              value={detailValue.fullname}
              placeholder="Enter your full name"
              onChange={handleChange}
              className="border py-2 w-full p-4 rounded-xl border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>
          <div>
            Date of birth
            <input
              name="DOB"
              type="date"
              value={detailValue.DOB}
              onChange={handleChange}
              className="border py-2 w-full p-4 rounded-xl border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>
          <div>
            <div className="flex gap-2 md:gap-5">
              Gender :
              <input
                type="radio"
                name="gender"
                value="male"
                checked={detailValue.gender === "male"}
                onChange={handleChange}
              />
              Male
              <input
                type="radio"
                name="gender"
                value="female"
                checked={detailValue.gender === "female"}
                onChange={handleChange}
              />
              Female
              <input
                type="radio"
                name="gender"
                value="others"
                checked={detailValue.gender === "others"}
                onChange={handleChange}
              />
              Others
            </div>
          </div>
          <div>
            Address
            <input
              name="address"
              type="text"
              value={detailValue.address}
              placeholder="Enter your full address"
              onChange={handleChange}
              className="border py-2 w-full p-4 rounded-xl border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>
          <div>
            Blood Group
            <input
              name="bloodGroup"
              type="text"
              value={detailValue.bloodGroup}
              placeholder="Enter your Blood group"
              onChange={handleChange}
              className="border py-2 w-full p-4 rounded-xl border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>
          <div>
            Contact
            <input
              name="contact"
              type="number"
              value={detailValue.contact}
              placeholder="Enter Contact"
              onChange={handleChange}
              className="border py-2 w-full p-4 rounded-xl border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          <div>
            <input
              type="submit"
              className="px-4 py-2 rounded-lg bg-rose-400 hover:bg-rose-500 text-white font-bold"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailForm;
