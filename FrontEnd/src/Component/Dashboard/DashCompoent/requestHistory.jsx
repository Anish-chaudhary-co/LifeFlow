import React, { useState, useContext, useEffect } from "react";

const requestHistory = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch("http://localhost/fourthProject/dashboard/requestHistory.php", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((request) => {
        if (request.success) {
          console.log(request.user);

          setData(request.user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(data);

  if (!data) {
    return <p>Data is Getting..........</p>;
  }

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold">Blood request history</h1>
      <table className="border mt-4 w-full border-collapse">
        <thead>
          <tr className="border">
            <th className="border-r p-3">S.N</th>
            <th className="border-r p-3">Name</th>
            <th className="border-r p-3">Blood Type</th>
            <th className="border-r p-3">Units</th>
            <th className="border-r p-3">Hospital Name</th>
            <th className="border-r p-3">Hospital Phone</th>
            <th className="border-r p-3">Address</th>
            <th className="border-r p-3">Notes</th>
            <th className="border-r p-3">Action</th>
          </tr>
        </thead>
        <tbody className="border-b">
          {/* {patient.map((user, index) => ( */}
          <tr>
            <td className="border-r p-3">{/* ${index + 1} */}1</td>
            <td className="border-r p-3">Anish chaudhary</td>
            <td className="border-r p-3">o+</td>
            <td className="border-r p-3">3</td>
            <td className="border-r p-3">CMC</td>
            <td className="border-r p-3">981234567</td>
            <td className="border-r p-3">bharatpur</td>
            <td className="border-r p-3 ">
              <p className="line-clamp-2  break-all ">blood needed</p>
            </td>
            <td className="flex gap-3 justify-center p-3">
              <button className="border rounded-lg bg-green-400 text-white font-bold px-4">
                Edit
              </button>
              <button className="border rounded-lg bg-red-400 text-white font-bold px-4">
                Delete
              </button>
            </td>
          </tr>
          {/* ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default requestHistory;
