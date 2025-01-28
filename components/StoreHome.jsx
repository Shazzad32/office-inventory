"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const StoreHome = () => {
  const [state, setState] = useState({ datas: [] });
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("/api/devices").then((res) => {
      let data = res.data;
      let old = { ...state };
      old.datas = data;
      setState(old);
    });
  };

  const totalDevice = state.datas.filter(
    (item) => item.send_to != "Retail" && item.send_to != "Rangs"
  );

  const voiceDevice = state.datas.filter(
    (item) =>
      item.send_to != "Retail" &&
      item.send_to != "Rangs" &&
      item.device_type === "Voice"
  );

  const nonVoiceDevice = state.datas.filter(
    (item) =>
      item.send_to != "Retail" &&
      item.send_to != "Rangs" &&
      item.device_type === "Non Voice"
  );

  return (
    <div className="h-[95%] w-full p-4 flex flex-col gap-4 items-center justify-evenly">
      <Link
        href={"/store"}
        className="w-[90%] h-[33%] bg-rose-500 rounded-md flex items-center justify-center gap-4 text-white"
      >
        Total Device<p className="text-2xl">{totalDevice.length}</p>
      </Link>
      <div className="w-[90%] h-[33%] bg-rose-500 rounded-md flex items-center justify-center gap-4 text-white">
        VOice Device <p className="text-2xl">{voiceDevice.length}</p>
      </div>
      <div className="w-[90%] h-[33%] bg-rose-500 rounded-md flex items-center justify-center gap-4 text-white">
        Non VOice Device <p className="text-2xl">{nonVoiceDevice.length}</p>
      </div>
    </div>
  );
};

export default StoreHome;
