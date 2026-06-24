import React from "react";

const howToUse = () => {
  return (
    <div className="flex flex-col gap-4 p-2 mt-8 border border-slate-200">
      <span className="font-bold text-sm text-rose-500 ml-24">
        HOW IT WORKS
      </span>
      <div className="ml-24">
        <h1 className="font-bold text-2xl">The path to saving a life.</h1>
        <p className="text-gray-400">
          Three simple steps connect critical needs with wiling donors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 m-2 ml-24">
        <div className="border p-4 h-50 md:w-97 rounded-2xl border-gray-300 bg-slate-200">
          <span className="text-gray-700 font-bold">01</span>
          <h4 className="font-bold text-lg">Register & verify</h4>
          <p className="text-gray-500 text-sm">
            Complete your donor profile with blood group and medical history.
            Verified in under five minutes.
          </p>
        </div>
        <div className="border p-4 h-50 md:w-97 rounded-2xl border-gray-300 bg-slate-200">
          <span className="text-gray-700 font-bold">02</span>
          <h4 className="font-bold text-lg">Get matched instantly</h4>
          <p className="text-gray-500 text-sm">
            Receive alerts when your blood type is needed nearby, or search for
            active emergency requests.
          </p>
        </div>
        <div className="border p-4 h-50 md:w-97 rounded-2xl border-gray-300 bg-slate-200">
          <span className="text-gray-700 font-bold">03</span>
          <h4 className="font-bold text-lg">Donate & save</h4>
          <p className="text-gray-500 text-sm">
            Visit the verified blood bank, donate safely, and track every life
            you've helped save.
          </p>
        </div>
      </div>
    </div>
  );
};

export default howToUse;
