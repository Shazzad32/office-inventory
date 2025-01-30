import React from "react";
import DeviceRetailForm from "@/components/DeviceRetailForm";

const UpdateRetail = async ({ params }) => {
  const { id } = await params;

  const response = await fetch(`${process.env.URL}/api/devices/${id}`);
  const data = await response.json();

  const techniciansRes = await fetch(
    "https://servicecheckapp.vercel.app/api/technician"
  );

  const technicians = await techniciansRes.json()

  // console.log(technicians)
  // console.log(await technicians.json());

  // console.log(data);
  return (
    <div className="w-full flex flex-col items-center justify-center sm:w-full ">
      <p className="text-sm font-bold uppercase text-orange-400 md:text-3xl flex justify-center items-end">
        Update Form
      </p>
      <DeviceRetailForm
        defaultItem={data}
        isUpdate={true}
        technicians={technicians}
      />
    </div>
  );
};

export default UpdateRetail;
