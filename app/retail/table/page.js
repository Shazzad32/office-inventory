import { FiEdit } from "react-icons/fi";
import Link from "next/link";

const RetailTable = ({ item }) => {
  const formattedDate = item?.sending_date
    ? new Date(item.sending_date)
        .toLocaleDateString("en-GB")
        .replace(/\//g, "-")
    : new Date().toLocaleDateString("en-GB").replace(/\//g, "-");
  const formatteInsertdDate = item?.insert_date
    ? new Date(item.insert_date).toLocaleDateString("en-GB").replace(/\//g, "-")
    : new Date().toLocaleDateString("en-GB").replace(/\//g, "-");

  return (
    <div className={`h-auto w-[100%]  flex lg:flex-row lg:h-14 items-center`}>
      <div className="hidden lg:flex lg:w-[90%] lg:px-2">
        <p className="flex-[1.5] overflow-hidden text-ellipsis whitespace-nowrap">
          {item?.device_id}
        </p>
        <p className="flex-[1.5] overflow-hidden text-ellipsis whitespace-nowrap">
          {item?.device_model}
        </p>
        <p className="flex-[1.5] overflow-hidden text-ellipsis whitespace-nowrap">
          {item?.device_type}
        </p>
        <p className="flex-[1.5] overflow-hidden text-ellipsis whitespace-nowrap">
          {item?.issue_by}
        </p>
        <p className="flex-[1.5] overflow-hidden text-ellipsis whitespace-nowrap">
          {item?.district}
        </p>
        <p className="flex-[1.5] overflow-hidden text-ellipsis whitespace-nowrap">
          {formatteInsertdDate}
        </p>
        <p className="flex-[1.5] overflow-hidden text-ellipsis whitespace-nowrap">
          {formattedDate}
        </p>
      </div>
      <div className="block lg:hidden w-full bg-white p-4 border-2 border-black">
        <p>
          <strong>
            Device ID: <span className="text-red-700">{item?.device_id}</span>
          </strong>
        </p>
        <p>
          <strong>From :</strong> {item?.from}
        </p>

        <p>
          <strong>Type :</strong> {item?.type}
        </p>
        <p>
          <strong>Insert Date:</strong> {formattedDate}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center  gap-6 w-[15%] lg:w-[10%] lg:mt-0 lg:flex lg:flex-row lg:gap-12">
        {item?.is_complete ? (
          <>
            <FiEdit className="text-gray-400 cursor-not-allowed" />
          </>
        ) : (
          <>
            {/* <Link href={`/retail/${item?._id}/update`}>
              <FiEdit className="text-black" />
            </Link> */}

            {item?._id && (
              <Link href={`/retail/${item._id}/update`}>
                <FiEdit className="text-black" />
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RetailTable;
