import { useState, useContext, useEffect } from "react";
import {
  FaTint,
  FaCalendarAlt,
  FaPhone,
  FaMapMarkedAlt,
  FaVenusMars,
  FaUser,
  FaShieldAlt,
} from "react-icons/fa";
import ProfileShow from "./profileShow";
import { profileContext } from "../../../Context/profileShowContext";

const detail = {
  fullname: "",
  DOB: "",
  gender: "",
  address: "",
  bloodGroup: "",
  contact: "",
};
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const PersonalDetailForm = () => {
  const { profile, setProfile } = useContext(profileContext);
  const [detailValue, setDetailValue] = useState(detail);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost/LifeFlow/Blood-Donation/BackEnd/dashboard/profileDetail.php",
          {
            method: "GET",
            credentials: "include",
          },
        );
        const result = await response.json();

        if (response.status === 404 && !result.success) {
          if (isMounted) {
            setProfile(null);
          }
          return;
        }

        if (!response.ok || !result.success || !result.profile) {
          throw new Error(result.message || "Unable to load your profile.");
        }

        if (isMounted) {
          setProfile(result.profile);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setMessage(error.message || "Unable to load your profile.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingProfile(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [setProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetailValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost/LifeFlow/Blood-Donation/BackEnd/dashboard/personalDetail.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...detailValue,
          }),
        },
      );
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to save personal details.");
      } else {
        setProfile({
          FullName: detailValue.fullname,
          DateOfBirth: detailValue.DOB,
          Gender: detailValue.gender,
          Address: detailValue.address,
          BloodGroup: detailValue.bloodGroup,
          Phone: detailValue.contact,
        });
        setMessage(result.message || "Personal details saved successfully.");
      }
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Unable to save personal details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className=" border p-2 border-slate-200 rounded-2xl shadow-2xl bg-white">
        {isLoadingProfile ? (
          <p role="status">Checking your profile...</p>
        ) : profile ? (
          <ProfileShow />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-4">
              <span className="py-2 px-2 rounded-4xl bg-rose-500">
                <FaUser color="white" size={40} />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-semibold">Personal Detail:</h3>
                <span className="text-slate-400 font-sans">
                  Your identifying information.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <div>
                <span className="flex gap-2 items-center">
                  <FaUser />
                  Full Name
                </span>
                <input
                  name="fullname"
                  type="text"
                  required
                  value={detailValue.fullname}
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  className="border py-2 w-full p-4 rounded-xl border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
                />
              </div>
              <div>
                <span className="flex gap-2 items-center">
                  <FaCalendarAlt />
                  Date of birth
                </span>
                <input
                  name="DOB"
                  type="date"
                  required
                  value={detailValue.DOB}
                  onChange={handleChange}
                  className="border py-2 w-full p-4 rounded-xl border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
                />
              </div>
              <div>
                <div>
                  <span className="flex gap-2 items-center">
                    <FaVenusMars />
                    Gender :
                  </span>
                  <div className="flex gap-2 md:gap-4">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      required
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
              </div>
              <div>
                <span className="flex gap-2 items-center">
                  <FaMapMarkedAlt />
                  Address
                </span>
                <input
                  name="address"
                  type="text"
                  required
                  value={detailValue.address}
                  placeholder="Enter your full address"
                  onChange={handleChange}
                  className="border py-2 w-full p-4 rounded-xl border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
                />
              </div>
              <div>
                <span className="flex gap-2 items-center">
                  <FaTint />
                  Blood Group
                </span>
                <select
                  name="bloodGroup"
                  value={detailValue.bloodGroup}
                  onChange={handleChange}
                  required
                  className="border py-2 ml-4 font-semibold md:w-full rounded-xl border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
                >
                  <option value="" disabled>
                    Select your blood group
                  </option>
                  {bloodGroups.map((group) => (
                    <option
                      key={group}
                      value={group}
                      className="font-semibold rounded-2xl"
                    >
                      {group}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span className="flex gap-2 items-center">
                  <FaPhone />
                  Contact
                </span>
                <input
                  name="contact"
                  type="tel"
                  required
                  value={detailValue.contact}
                  placeholder="Enter Contact"
                  onChange={handleChange}
                  className="border py-2 w-full p-4 rounded-xl border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg disabled:opacity-50"
                >
                  {/* <FaFloppyDisk /> */}
                  {isSubmitting ? "Saving..." : "Save details"}
                </button>
              </div>
            </div>
            {message && (
              <p className="mt-4" role="status">
                {message}
              </p>
            )}

            <div className="flex gap-2 border border-slate-400 p-4 mt-10 rounded-lg  ">
              <div>
                <FaShieldAlt size={40} color="green" />
              </div>
              <div>
                <h4 className="font-semibold text-green-500 text-sm">
                  PROFILE STATUS
                </h4>
                <p>You're ready to make an impact</p>
                <span className="text-slate-700">
                  We'll use your details to show relevant donation opportunities
                  and appointments.
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default PersonalDetailForm;
