// import { useContext } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { UserContext } from "./AuthContext";

// const protectedSession = () => {
//   const { user, loading } = useContext(UserContext);
//   if (loading) {
//     return <p>Loading data....</p>;
//   }
//   if (!user) {
//     return <Navigate to="/signIn" replace />;
//   }
//   return <Outlet />;
// };

// export default protectedSession;
