import React from "react";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";

const StoreTable = ({ item }) => {
  const formattedDate = item?.insert_date
    ? new Date(item.insert_date).toLocaleDateString("en-GB").replace(/\//g, "-")
    : new Date().toLocaleDateString("en-GB").replace(/\//g, "-");

  return (
    <div
      className={`h-auto w-full lg:w-[100%] flex lg:flex-row lg:h-14 items-center`}
    >
      <div className="hidden lg:flex lg:w-[90%] lg:px-2 ">
        <p className="flex-[2] overflow-hidden text-ellipsis whitespace-nowrap">
          {item?.device_id}
        </p>
        <p className="flex-[2] overflow-hidden text-ellipsis whitespace-nowrap">
          {item?.device_model}
        </p>
        <p className="flex-[2] overflow-hidden text-ellipsis whitespace-nowrap">
          {item?.from}
        </p>
        <p className="flex-[2] overflow-hidden text-ellipsis whitespace-nowrap">
          {item?.device_type}
        </p>
        <p className="flex-[2] overflow-hidden text-ellipsis whitespace-nowrap">
          {formattedDate}
        </p>
      </div>
      <div className="block lg:hidden w-full bg-white p-4 border-2 border-black">
        <p>
          <strong>
            Device ID: <span className="text-red-700">{formattedDate}</span>
          </strong>
        </p>
        <p>
          <strong>Model :</strong> {item?.device_model}
        </p>
        <p>
          <strong>From :</strong> {item?.from}
        </p>
        <p>
          <strong>Type :</strong> {item?.device_type}
        </p>
        <p>
          <strong>Insert Date:</strong> {item?.insert_date}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center  gap-6 w-[15%] lg:w-[15%] lg:mt-0 lg:flex lg:flex-row lg:gap-12">
        <Link href={`/store/${item?._id}/update`}>
          <FiEdit className="text-black" />
        </Link>
        {/* <Link href={`/store/${item?._id}/delete`}>
          <DeleteForeverIcon className="text-red-700" />
        </Link> */}
      </div>
    </div>
  );
};

export default StoreTable;
