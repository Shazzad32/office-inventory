import React from "react";

const Data = async () => {

  const techniciansRes = await fetch(
    "https://servicecheckapp.vercel.app/api/technician"
  );

  const technicians = await techniciansRes.json()

  return (
    <div>
      {technicians.map((item, i) => {
        return (
          <div>
            <p>{item.technician_name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Data;
