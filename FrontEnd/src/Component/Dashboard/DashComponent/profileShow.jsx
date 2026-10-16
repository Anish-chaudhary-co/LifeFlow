import { useContext } from "react";
import { UserContext } from "../../../Context/profileShowContext";
import { use } from "react";

const profileShow = () => {
  const { profile } = useContext(UserContext);
  return <div>{profile.fullName}</div>;
};

export default profileShow;
