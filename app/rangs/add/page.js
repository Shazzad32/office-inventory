import React from "react";
import DeviceRangsForm from "@/components/DeviceRangsForm";

const defaultItem = {
  device_id: "",
  device_model: "",
  device_type: "",
  Workshop: "",
  issue_by: "",
  send_to: "Rangs",
  from: "",
  insert_date: "",
  sending_date: "",
};

const AddService = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8 sm:gap-4">
      <div className="h-[70%] lg:h-[80%] lg:w-[80%] w-[100%]   flex flex-col items-center justify-center bg-white ">
        <p className="text-orange-500 uppercase text-3xl">Add New Device</p>{" "}
        <DeviceRangsForm defaultItem={defaultItem} isUpdate={false} />
      </div>
    </div>
  );
};

export default AddService;
