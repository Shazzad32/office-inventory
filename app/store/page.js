"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import StoreTable from "./storetable/page";
import axios from "axios";
import ImportFile from "@/components/ImportFile";

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
    axios.get("/api/store").then((res) => {
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
            <Link href={"/store/add"}> ADD</Link>
          </button>
          <ImportFile />
        </div>
        <div className="w-[40%] flex justify-center ">
          {" "}
          <p className="text-white uppercase lg:flex hidden">Total Stock</p>
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
            <div className="w-[85%] flex items-center px-2 uppercase">
              <p className="flex-[2]">Device_id</p>
              <p className="flex-[2]">Model</p>
              <p className="flex-[2]">From</p>
              <p className="flex-[2]">Type</p>
              <p className="flex-[2]">Insert Date</p>
            </div>
            <div className="w-[15%]  flex items-center justify-center uppercase">
              Action
            </div>
          </div>
          <div className="h-[92%] w-full overflow-auto bg-white">
            {state.datas.map((item, i) => (
              <div
                key={i}
                className={`${i % 2 === 0 ? "bg-gray-200" : "bg-gray-300"}`}
              >
                {" "}
                <StoreTable item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
