import React from 'react'

const TotalUser= () => {
  return (
    <div className='flex items-center justify-center bg-gray-200'>
    <div className="grid grid-cols-2 m-12 border text-center w-80 border-gray-300 bg-white rounded-xl">
        <div className="flex flex-col px-4 justify-center items-center rounded-2xl font-bold shadow-2xl bg-white border border-gray-300 m-2 p-4">
          Total Donors <span>3234</span>
        </div>
        <div className="flex flex-col px-4 justify-center items-center rounded-2xl font-bold shadow-2xl bg-white border border-gray-300 m-2 p-4">
          Request Fulfilled <span>34534</span>
        </div>
        <div className="flex flex-col px-4 justify-center items-center rounded-2xl font-bold shadow-2xl bg-white border border-gray-300 m-2 p-4">
          Blood Banks <span>354</span>
        </div>
        <div className="flex flex-col px-4 justify-center items-center rounded-2xl font-bold shadow-2xl bg-white border border-gray-300 m-2 p-4">
          Active Now <span className="text-red-500">345</span>
        </div>
      </div>
      </div>
  )
}

export default TotalUser;