import React from "react";
import DeleteItemFromStore from "@/components/DeleteItemFromStore";

const DeleteDevice = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(`${process.env.URL}/api/store/${id}`);
  const data = await response.json();

  return (
    <div className="w-full h-[100%] flex justify-center items-center">
      <DeleteItemFromStore data={data} />
    </div>
  );
};

export default DeleteDevice;
