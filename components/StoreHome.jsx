"use client";
import Link from "next/link";
import React from "react";

const StoreHome = ({ totalDevices, voiceDevices, nonVoiceDevices }) => {
  return (
    <div className="h-[98%] w-full p-4 flex flex-col gap-4 items-center justify-evenly">
      <Link
        href={"/store"}
        className="w-[95%] h-[33%] bg-rose-500 rounded-md hidden lg:flex items-center justify-center gap-2 text-white"
      >
        Total Device<p className="text-2xl">{totalDevices}</p>
      </Link>
      <div className="hidden w-[98%] h-[33%] bg-rose-500 rounded-md lg:flex items-center justify-center gap-2 text-white">
        VOice Device <p className="text-2xl">{voiceDevices}</p>
      </div>
      <div className="w-[98%] h-[33%] bg-rose-500 rounded-md hidden lg:flex items-center justify-center gap-2 text-white">
        Non VOice Device <p className="text-2xl">{nonVoiceDevices}</p>
      </div>
      <div className="h-[99%] w-[95%] lg:hidden flex flex-col gap-2">
        <div className="flex-[5] bg-orange-400 text-sm gap-3 flex flex-col items-start justify-center align-left rounded-md">
          <div className="text-sm ml-3 bg-white">
            Total Device:
            <span className="text-orange-400 text-xl">{totalDevices}</span>
          </div>
          <div className="text-sm ml-3 bg-white">
            Voice Device:{voiceDevices}
          </div>
          <div className="text-sm ml-3 bg-white">
            Non Voice Device:{nonVoiceDevices}
          </div>
        </div>
        <div className="flex-[5] bg-orange-600"></div>
      </div>
    </div>
  );
};

export default StoreHome;
