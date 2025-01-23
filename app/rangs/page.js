"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ImportFile from "@/components/ImportFile";
import RetailTable from "./table/page";

const Store = () => {
  const [state, setState] = useState({
    datas: [],
    dataResults: "",
    searchItem: "",
    nextday: false,
    selectedDate: null,
    open: false,
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("/api/rangs").then((res) => {
      let data = res.data;
      let old = { ...state };
      old.datas = data;
      old.dataResults = data;
      setState(old);
    });
  };

  const totalDevice = state.datas.length;

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

  return (
    <div className="h-[100%] w-full">
      <div className="h-[10%] w-full bg-gray-800 flex items-center px-4">
        <div className="w-[30%] flex gap-2">
          {" "}
          <button className="text-[8px] h-[20px] w-[40px] lg:w-[60px] bg-orange-400 lg:bg-transparent px-1 lg:text-[16px] lg:border-2 lg:h-[30px] lg:p-4 rounded-md flex items-center justify-center text-white">
            <Link href={"/"}> HOME</Link>
          </button>
          <button className="text-[8px] h-[20px] w-[40px] lg:w-[60px] bg-orange-400 lg:bg-transparent px-1 lg:text-[16px] lg:border-2 lg:h-[30px] lg:p-4 rounded-md flex items-center justify-center text-white">
            <Link href={"/rangs/add"}>ADD</Link>
          </button>
          <ImportFile />
        </div>
        <div className="w-[40%] flex justify-center">
          {" "}
          <p className="text-white uppercase lg:flex hidden">Rangs Page</p>
        </div>
        <div className="w-[30%] flex justify-end gap-3">
          <div className="bg-white px-2 rounded-md flex items-center">
            Total Device :{" "}
            <span className="text-xl font-bold text-orange-500 ml-1">
              {totalDevice}
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
              <p className="flex-[1.75]">Sending Date</p>
            </div>
            <div className="w-[15%]  flex items-center justify-center uppercase">
              Action
            </div>
          </div>
          <div className="h-[92%] overflow-auto bg-white">
            {state.datas.map((item, i) => (
              <div
                key={i}
                className={`${i % 2 === 0 ? "bg-gray-200" : "bg-gray-300"}`}
              >
                {" "}
                <RetailTable item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
