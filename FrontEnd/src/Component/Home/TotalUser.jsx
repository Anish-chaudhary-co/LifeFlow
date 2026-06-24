const TotalUser = () => {
  const totalUser = [
    "Total Donors",
    "Request Fulfilled",
    "Blood Banks",
    "Active Now",
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-4 mt-6 text-center w-6xl">
        {totalUser.map((users) => (
          <div
            key={users}
            className="flex flex-col px-4 py-9 justify-center items-center rounded-2xl font-bold shadow-2xl border bg-slate-200 border-gray-300 m-2 p-4"
          >
            {users}
          </div>
        ))}
        {/* <div className="flex flex-col px-4 justify-center items-center rounded-2xl font-bold shadow-2xl bg-white border border-gray-300 m-2 p-4">
          Total Donors <span>3234</span>
        </div>
        <div className={`flex flex-col px-4 justify-center items-center rounded-2xl font-bold shadow-2xl bg-white border border-gray-300 m-2 p-4 ${}`}>
          Request Fulfilled <span>34534</span>
        </div>
        <div className="flex flex-col px-4 justify-center items-center rounded-2xl font-bold shadow-2xl bg-white border border-gray-300 m-2 p-4">
          Blood Banks <span>354</span>
        </div>
        <div className="flex flex-col px-4 justify-center items-center rounded-2xl font-bold shadow-2xl bg-white border border-gray-300 m-2 p-4">
          Active Now <span className="text-red-500">345</span>
        </div> */}
      </div>
    </div>
  );
};

export default TotalUser;
