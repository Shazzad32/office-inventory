import React from "react";
import DeviceStoreForm from "@/components/DeviceStoreForm";

const defaultItem = {
  device_id: "",
  from: "",
  device_model: "",
  device_type: "",
  send_to: "",
  insert_date: "",
  sending_date: "",
};

const AddService = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8 sm:gap-4 bg-green-200">
      <div className="h-[60%] lg:h-[80%] lg:w-[80%] w-[100%]   flex flex-col items-center justify-center bg-white ">
        <p className="text-orange-500 uppercase text-3xl">Add New Device</p>{" "}
        <DeviceStoreForm defaultItem={defaultItem} isUpdate={false} />
      </div>
    </div>
  );
};

export default AddService;
