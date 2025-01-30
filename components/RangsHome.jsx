"use client";
import React from "react";
import Link from "next/link";

const RangsHome = ({ totalInRangs,voiceInrangs,nonVoiceInRangs }) => {
  return (
    <div className="h-[95%] w-full p-4 flex flex-col gap-4 items-center justify-evenly">
      <Link
        href={"/rangs"}
        className="w-[90%] h-[33%] bg-cyan-500 rounded-md flex items-center justify-center gap-4 text-white"
      >
        Total Device<p className="text-2xl">{totalInRangs}</p>
      </Link>
      <div className="w-[90%] h-[33%] bg-cyan-500 rounded-md flex items-center justify-center gap-4 text-white">
        Voice Device <p className="text-2xl">{voiceInrangs}</p>
      </div>
      <div className="w-[90%] h-[33%] bg-cyan-500 rounded-md flex items-center justify-center gap-4 text-white">
        Non VOice Device <p className="text-2xl">{nonVoiceInRangs}</p>
      </div>
    </div>
  );
};

export default RangsHome;
