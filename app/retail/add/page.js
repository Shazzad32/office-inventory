import React from "react";
import DeviceRetailForm from "@/components/DeviceRetailForm";

const defaultItem = {
  device_id: "",
  send_to: "",
  district: "",
  issue_by: "",
  sending_date: "",
  install_date: "",
  device_type: "",
  device_price: "",
};

const AddService = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-6 sm:gap-4">
      <div className="h-[90%] lg:h-[85%] lg:w-[80%] w-[100%] flex flex-col items-center justify-center bg-white ">
        <p className="text-orange-500 uppercase text-3xl">Add New Device</p>
        <DeviceRetailForm defaultItem={defaultItem} isUpdate={false} />
      </div>
    </div>
  );
};

export default AddService;
