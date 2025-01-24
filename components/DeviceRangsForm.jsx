"use client";
import { Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import dayjs from "dayjs";

const DeviceRangsForm = ({ defaultItem, isUpdate }) => {
  const router = useRouter();
  const [item, setItem] = useState({
    ...defaultItem,
  });

  const saveDevice = async () => {
    const res = await fetch("/api/rangs", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (res.ok) {
      router.push("/rangs");
    } else {
      throw new Error("Failed to save data");
    }
  };

  const updateDevice = async () => {
    const res = await fetch(`/api/rangs/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      throw new Error("Failed to update topic");
    }
    router.push("/rangs");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-[100%] flex items-center justify-center gap-2 p-4 lg:p-6 lg:w-[50%] lg:gap-4 flex-col">
      <div className="w-full h-[80%] flex gap-4 flex-col">
        <TextField
          type="text"
          name="device_id"
          value={item.device_id || ""}
          label="Device Id"
          onChange={handleChange}
        />
        <TextField
          type="text"
          name="from"
          value={item.from || ""}
          label="From"
          onChange={handleChange}
        />
        <TextField
          type="text"
          name="to"
          value={item.to || ""}
          label="To"
          onChange={handleChange}
        />
        <TextField
          type="text"
          name="issue_by"
          value={item.issue_by || ""}
          label="Issue By"
          onChange={handleChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="w-[100%]"
            label="Insert Date"
            name="insert_date"
            value={item.insert_date ? dayjs(item.insert_date) : null}
            onChange={(newValue) => {
              handleChange({
                target: {
                  name: "insert_date",
                  value: newValue ? newValue.toISOString() : "", // Use ISO format
                },
              });
            }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="w-[100%]"
            label="Sending Date"
            name="sending_date"
            value={item.sending_date ? dayjs(item.sending_date) : null}
            onChange={(newValue) => {
              handleChange({
                target: {
                  name: "sending_date",
                  value: newValue ? newValue.toISOString() : "", // Use ISO format
                },
              });
            }}
          />
        </LocalizationProvider>
      </div>
      <div className="flex w-full justify-end gap-4">
        <Button variant="outlined">
          <Link href="/rangs">Cancel</Link>
        </Button>
        <Button
          onClick={isUpdate ? updateDevice : saveDevice}
          variant="outlined"
        >
          {isUpdate ? "Update" : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default DeviceRangsForm;
