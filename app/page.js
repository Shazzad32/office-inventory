import RangsHome from "@/components/RangsHome";
import RetailHome from "@/components/RetailHome";
import StoreHome from "@/components/StoreHome";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full bg-skyblue-500 flex">
      <div className="flex-[2] lg:flex-[1.5] h-[100%] flex justify-center items-center">
        <div className="h-[90%] w-[95%] bg-white"></div>
      </div>
      <div className="flex-[8] lg:flex-[8.5] h-full bg-green-600">
        <div className="h-[10%] w-full bg-gray-800 text-white flex lg:gap-2 md:gap:3 items-center lg:px-4 px-2">
          <button className="border-2 h-[30px] lg:p-2 p-2 rounded-md flex items-center justify-center">
            <Link href={"/store"}> STORE</Link>
          </button>
          <button className="border-2 h-[30px] lg:p-2 p-2 rounded-md flex items-center justify-center">
            <Link href={"/rangs"}> RANGS</Link>
          </button>
          <button className="border-2 h-[30px] lg:p-2 p-2 rounded-md flex items-center justify-center">
            <Link href={"/retail"}>RETAIL</Link>
          </button>
        </div>
        <div className="h-[90%] w-full bg-gray-400 flex flex-col gap-4 md:flex-row lg:flex items-center justify-center">
          <div className="w-[90%] h-[30%] lg:w-[32%] rounded-md lg:h-[90%] bg-white text-center uppercase p-2 font-bold">
            Total Stock
            {<StoreHome />}
          </div>
          <div className="w-[90%] h-[30%] lg:w-[32%] rounded-md lg:h-[90%] bg-white text-center p-2 font-bold">
            Retail Information
            <RetailHome />
          </div>
          <div className="w-[90%] h-[30%] lg:w-[32%] rounded-md lg:h-[90%] bg-white text-center uppercase p-2 font-bold">
            Rangs Information
            <RangsHome />
          </div>
        </div>
      </div>
    </div>
  );
}
