"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SoldTable from "./table/page";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const SoldPage = () => {
  const [state, setState] = useState({
    datas: [],
    dataResults: "",
    searchItem: "",
    nextday: false,
    selectedDate: null,
    open: false,
    startDate: "",
    endDate: "",
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("/api/retail").then((res) => {
      let data = res.data;
      let old = { ...state };
      old.datas = data;
      old.dataResults = data;
      setState(old);
    });
  };

  const soldDevice = state.datas.filter((item) => item.is_complete === true);

  const handleSearch = (e) => {
    const searchTxt = e.target.value.toLowerCase();
    setState((prev) => ({
      ...prev,
      searchItem: searchTxt,
      datas: searchTxt
        ? prev.dataResults.filter((x) =>
            Object.keys(x).some((key) =>
              x[key]?.toString().toLowerCase().includes(searchTxt)
            )
          )
        : [...prev.dataResults],
    }));
  };

  const totalDevice = state.datas.length;

  const filterByDate = () => {
    const { startDate, endDate, dataResults } = state;
    if (startDate && endDate) {
      const filteredData = dataResults.filter((item) => {
        if (item.install_date) {
          const installDate = new Date(item.install_date).toLocaleDateString(
            "en-CA",
            {
              timeZone: "Asia/Dhaka",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }
          );
          const start = new Date(startDate).toLocaleDateString("en-CA", {
            timeZone: "Asia/Dhaka",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          const end = new Date(endDate).toLocaleDateString("en-CA", {
            timeZone: "Asia/Dhaka",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          return installDate >= start && installDate <= end;
        }
        return false;
      });
      setState({ ...state, datas: filteredData });
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onDateChange = (date) => {
    const selectedDate = new Date(date).setHours(0, 0, 0, 0);
    const filteredData = state.dataResults.filter((item) => {
      const itemDate = new Date(item.install_date).setHours(0, 0, 0, 0);
      return itemDate === selectedDate;
    });

    setState((prevState) => ({
      ...prevState,
      selectedDate: date,
      datas: filteredData,
    }));
  };
  const totalDevicePrice = state.datas.reduce((total, item) => {
    return total + Number(item.device_price || 0);
  }, 0);
  return (
    <div className="h-[100%] w-full">
      <div className="h-[10%] w-full bg-gray-800 flex items-center px-4">
        <div className="w-[50%] flex gap-2">
          {" "}
          <button className="text-[8px] h-[20px] w-[40px] lg:w-[60px] bg-orange-400 lg:bg-transparent px-1 lg:text-[16px] lg:border-2 lg:h-[30px] lg:p-4 rounded-md flex items-center justify-center text-white">
            <Link href={"/"}> HOME</Link>
          </button>
          <input
            type="date"
            name="startDate"
            value={state.startDate}
            onChange={handleDateChange}
            className="border rounded p-1"
          />
          <input
            type="date"
            name="endDate"
            value={state.endDate}
            onChange={handleDateChange}
            className="border rounded p-1"
          />
          <button
            onClick={filterByDate}
            className="text-white px-2 rounded bg-red-500"
          >
            GO
          </button>
          <div className="bg-white px-2 rounded-md flex items-center">
            Total Amount :{" "}
            <span className="text-xl font-bold text-orange-500">
              {totalDevicePrice}
            </span>
          </div>
        </div>

        <div className="w-[50%] flex items-center justify-end gap-2">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="bg-white rounded-md ">
              <DatePicker
                label="Select a Date"
                value={state.selectedDate}
                onChange={(date) => onDateChange(date)}
                renderInput={(params) => (
                  <button {...params.inputProps}>
                    {state.selectedDate
                      ? new Date(state.selectedDate).toLocaleDateString()
                      : ""}
                  </button>
                )}
              />
            </div>
          </LocalizationProvider>

          <div className="bg-white px-2 py-2 rounded-md flex items-center">
            Sold :{" "}
            <span className="text-xl font-bold text-orange-500 ml-1">
              {soldDevice.length}
            </span>
          </div>
          <input
            type="search"
            placeholder="Search..."
            className="h-[40px] px-4 rounded-md flex items-center justify-center text-black "
            value={state.searchItem}
            onChange={handleSearch}
          ></input>
        </div>
      </div>
      <div className="w-full bg-gray-500 h-[90%] flex items-center justify-center">
        <div className="h-[99%] w-[99.5%]">
          <div className="h-[8%] w-full bg-gray-800 flex text-white">
            <div className="w-[84%] flex items-center px-2 uppercase">
              <p className="flex-[1.75]">Device_id</p>
              <p className="flex-[1.75]">Send_To</p>
              <p className="flex-[1.75]">District</p>
              <p className="flex-[1.75]">Type</p>
              <p className="flex-[1.75]">Issue_By</p>
              <p className="flex-[1.75]">Price</p>
            </div>
            <div className="w-[15%]  flex items-center justify-center uppercase">
              Action
            </div>
          </div>
          <div className="h-[92%] overflow-auto bg-white">
            {soldDevice.map((item, i) => (
              <div
                key={i}
                className={`${i % 2 === 0 ? "bg-gray-200" : "bg-gray-300"}`}
              >
                {" "}
                <SoldTable item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoldPage;
