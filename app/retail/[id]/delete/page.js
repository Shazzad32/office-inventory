import React from "react";
import RetailDeviceDelete from "@/components/RetailDeviceDelete";

const DeleteDevice = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(`${process.env.URL}/api/retail/${id}`);
  const data = await response.json();

  return (
    <div className="w-full h-[100%] flex justify-center items-center">
      <RetailDeviceDelete data={data} />
    </div>
  );
};

export default DeleteDevice;
