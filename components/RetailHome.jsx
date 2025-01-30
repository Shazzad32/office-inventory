"use client";
import { calculateAmount } from "@/utils/utils";
import Link from "next/link";
import { React, useState } from "react";

const RetailHome = ({ totalInRetail }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const filteredSales = Array.isArray(totalInRetail)
    ? totalInRetail.filter((item) => {
        if (item.install_date) {
          const itemDate = new Date(item.install_date).toLocaleDateString(
            "en-CA",
            {
              timeZone: "Asia/Dhaka",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }
          );
          return itemDate === selectedDate && item.is_complete === true;
        }
        return false;
      })
    : [];

  const totalDevicePrice = filteredSales.reduce((total, item) => {
    return total + Number(item.device_price || 0);
  }, 0);

  const totalCompleteDevices = filteredSales.length;

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="h-[95%] w-full p-4 flex flex-col gap-4 items-center justify-evenly">
      <Link
        href={"/retail"}
        className="w-[90%] h-[33%] bg-purple-500 rounded-md flex flex-col text-left p-4 "
      >
        <p className="text-center text-white uppercase">
          Un Sold Device ={" "}
          <span>
            {totalInRetail.filter((x) => (x.is_complete === false)).length}
          </span>
        </p>

        <div className="flex gap-2">
          {" "}
          <div className="bg-white px-2 py-1 rounded-md flex items-center mt-2 w-[50%]">
            Voice :{" "}
            <span className="text-xl font-bold text-orange-500 ml-1">
              {totalInRetail.filter((x) =>x.is_complete === false && x.device_type === "Voice").length}
            </span>
          </div>
          <div className="bg-white px-2 py-1 rounded-md flex items-center mt-2 w-[50%] ">
            Non Voice :{" "}
            <span className="text-xl font-bold text-orange-500 ml-1">
              {
                totalInRetail.filter((x) =>x.is_complete === false && x.device_type === "Non_Voice")
                  .length
              }
            </span>
          </div>
        </div>
      </Link>
      <div className="w-[90%] h-[33%] bg-purple-500 rounded-md flex flex-col text-left p-4">
        <div className="flex justify-between">
          <p className="text-left text-white uppercase">Daily Report</p>
          <input
            type="date"
            name="selectedDate"
            value={selectedDate}
            onChange={handleDateChange}
            className="bg-white p-1 rounded-md"
          />
        </div>{" "}
        <div className="flex gap-4">
          <p className="text-sm bg-white w-[50%] px-2 py-2 mt-2 rounded-md">
            Today Sell:
            <span className="text-red-700 ml-2">{totalCompleteDevices}</span>
          </p>
          <p className="text-sm bg-white w-[50%] px-2 py-2 mt-2 rounded-md">
            Amount:
            <span className="text-red-600 ml-2">{totalDevicePrice}</span>
          </p>
        </div>
      </div>
      <Link
        href={"retail/sold"}
        className="w-[90%] h-[33%] bg-purple-500 rounded-md flex-col flex items-center justify-center "
      >
        <div className="bg-white px-2 py-1 rounded-md flex items-center mt-2 w-[70%] ">
          Sold Device :{" "}
          <span className="text-xl font-bold text-orange-500 ml-1">
            {totalInRetail.filter((x) => x.is_complete).length}
          </span>
        </div>

        <div className="bg-white px-2 py-1 rounded-md flex items-center mt-2 w-[70%]">
          Total Amount :{" "}
          <span className="text-xl font-bold text-orange-500 ml-1">
            {calculateAmount(totalInRetail.filter((x) => x.is_complete))}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default RetailHome;
