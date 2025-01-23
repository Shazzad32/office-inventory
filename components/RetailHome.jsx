"use client";
import axios from "axios";
import Link from "next/link";
import { React, useState, useEffect } from "react";

const RetailHome = (props) => {
  const [state, setState] = useState({ datas: [] });
  // const [selectedDate, setSelectedDate] = useState(
  //   new Date().toISOString().split("T")[0]
  // );
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("/api/retail").then((res) => {
      let data = res.data;
      let old = { ...state };
      old.datas = data;
      setState(old);
    });
  };

  const totalStockInRetail = state.datas.filter(
    (item) => item.is_complete === false
  );

  const totalSell = state.datas.filter((item) => item.is_complete === true);
  const unSoldDevice = totalStockInRetail - totalSell;

  const voiceDevice = state.datas.filter(
    (item) => item.device_type === "Voice" && item.is_complete === false
  );

  const nonVoiceDevice = state.datas.filter(
    (item) => item.device_type === "Non Voice" && item.is_complete === false
  );

  const totalDevicePrice = state.datas.reduce((total, item) => {
    return total + Number(item.device_price || 0);
  }, 0);

  // const filteredSales = state.datas.filter((item) => {
  //   if (item.install_date) {
  //     const itemDate = new Date(item.install_date).toISOString().split("T")[0];
  //     return itemDate === selectedDate;
  //   }
  //   return false;
  // });

  // const filteredSales = state.datas.filter((item) => {
  //   if (item.install_date) {
  //     const itemDate = new Date(item.install_date).toLocaleDateString("en-CA", {
  //       timeZone: "Asia/Dhaka",
  //       year: "numeric",
  //       month: "2-digit",
  //       day: "2-digit",
  //     });
  //     return itemDate === selectedDate;
  //   }
  //   return false;
  // });

  // const filteredSalesCount = filteredSales.length;

  const filteredSales = state.datas.filter((item) => {
    if (item.install_date) {
      const itemDate = new Date(item.install_date).toLocaleDateString("en-CA", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      return itemDate === selectedDate && item.is_complete === true;
    }
    return false;
  });

  // Total count of devices with is_complete === true for the selected date
  const totalCompleteDevices = filteredSales.length;

  const filteredSalesAmount = filteredSales.reduce((total, item) => {
    return total + Number(item.device_price || 0);
  }, 0);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // const totalSell =

  return (
    <div className="h-[95%] w-full p-4 flex flex-col gap-4 items-center justify-evenly">
      <Link
        href={"/retail"}
        className="w-[90%] h-[33%] bg-purple-500 rounded-md flex flex-col text-left p-4 "
      >
        <p className="text-center text-white uppercase">
          Un Sold Device = <span>{totalStockInRetail.length}</span>
        </p>

        <div className="flex gap-2">
          {" "}
          <div className="bg-white px-2 py-1 rounded-md flex items-center mt-2 w-[50%]">
            Voice :{" "}
            <span className="text-xl font-bold text-orange-500 ml-1">
              {voiceDevice.length}
            </span>
          </div>
          <div className="bg-white px-2 py-1 rounded-md flex items-center mt-2 w-[50%] ">
            Non Voice :{" "}
            <span className="text-xl font-bold text-orange-500 ml-1">
              {nonVoiceDevice.length}
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
        </div>
        <div className="flex gap-4">
          <p className="text-sm bg-white w-[50%] px-2 py-2 mt-2 rounded-md">
            Today Sell:
            <span className="text-red-700 ml-2">{totalCompleteDevices}</span>
          </p>
          <p className="text-sm bg-white w-[50%] px-2 py-2 mt-2 rounded-md">
            Amount:
            <span className="text-red-600 ml-2">{filteredSalesAmount}</span>
          </p>
        </div>
      </div>
      <div className="w-[90%] h-[33%] bg-purple-500 rounded-md flex-col flex items-center justify-center ">
        <div className="bg-white px-2 py-1 rounded-md flex items-center mt-2 w-[70%] ">
          Sold Device :{" "}
          <span className="text-xl font-bold text-orange-500 ml-1">
            {totalSell.length}
          </span>
        </div>

        <div className="bg-white px-2 py-1 rounded-md flex items-center mt-2 w-[70%]">
          Total Amount :{" "}
          <span className="text-xl font-bold text-orange-500 ml-1">
            {totalDevicePrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RetailHome;
