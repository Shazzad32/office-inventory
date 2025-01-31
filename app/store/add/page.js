import React from "react";
import DeviceStoreForm from "@/components/DeviceStoreFormOld";

const defaultItem = {
  device_id: "",
  device_model: "",
  device_type: "",
  from: "",
  district: "",
  insert_date: "",
  issue_by: "",
};

const AddService = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8 sm:gap-4">
      <div className="h-[60%] lg:h-[80%] lg:w-[80%] w-[100%]   flex flex-col items-center justify-center bg-white ">
        <p className="text-orange-500 uppercase text-3xl">Add New Device</p>{" "}
        <DeviceStoreForm defaultItem={defaultItem} isUpdate={false} />
      </div>
    </div>
  );
};

export default AddService;
