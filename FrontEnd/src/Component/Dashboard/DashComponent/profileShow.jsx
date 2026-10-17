import { useContext } from "react";
import { profileContext } from "../../../Context/profileShowContext";

const ProfileShow = () => {
  const { profile } = useContext(profileContext);

  return (
    <div className="mt-20 md:m-0">
      <p>Full Name: {profile.FullName}</p>
      <p>Date of birth: {profile.DateOfBirth}</p>
      <p>Gender: {profile.Gender}</p>
      <p>Address: {profile.Address}</p>
      <p>Blood Group: {profile.BloodGroup}</p>
      <p>Contact: {profile.Phone}</p>
    </div>
  );
};

export default ProfileShow;
