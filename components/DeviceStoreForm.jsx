"use client";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import dayjs from "dayjs";

const DeviceStoreForm = ({ defaultItem, isUpdate }) => {
  const router = useRouter();
  const [item, setItem] = useState({
    ...defaultItem,
  });

  const saveDevice = async () => {
    const res = await fetch("/api/store", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (res.ok) {
      router.push("/store");
    } else {
      throw new Error("Failed to save data");
    }
  };

  const updateDevice = async () => {
    if (item.send_to) {
      await handleTransfer();
      return;
    }
    const res = await fetch(`/api/store/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      throw new Error("Failed to update device");
    }

    router.push("/store");
  };

  const handleChangeTwo = (event) => {
    const { name, value } = event.target;
    setItem((prevState) => ({
      ...prevState,
      [name]: value || (name === "insert_date" ? new Date().toISOString() : ""),
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTransfer = async () => {
    const endpoint =
      item.send_to === "Retail"
        ? "/api/retail"
        : item.send_to === "Rangs"
        ? "/api/rangs"
        : null;

    if (!endpoint) {
      alert("Invalid destination selected. Please try again.");
      return;
    }

    try {
      const transferRes = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!transferRes.ok) {
        const errorText = await transferRes.text();
        throw new Error(`Failed to transfer product: ${errorText}`);
      }

      const deleteRes = await fetch(`/api/store/${item._id}`, {
        method: "DELETE",
      });

      if (!deleteRes.ok) {
        const errorText = await deleteRes.text();
        console.error("Delete request failed:", deleteRes.status, errorText);
        throw new Error(`Failed to delete product from store: ${errorText}`);
      }

      router.push("/store");
    } catch (error) {
      console.error("Error during transfer:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="w-full h-[100%] flex items-center justify-center gap-2 p-4 lg:p-6 lg:w-[50%] lg:gap-4 flex-col">
      <div className="w-full h-[90%] flex gap-4 flex-col">
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
          name="device_model"
          value={item.device_model || ""}
          label="Device Model"
          onChange={handleChange}
        />

        {isUpdate && (
          <FormControl fullWidth>
            <InputLabel>Send To</InputLabel>
            <Select
              type="text"
              name="send_to"
              value={item.send_to || ""}
              onChange={handleChangeTwo}
            >
              <MenuItem value="Retail">Retail</MenuItem>
              <MenuItem value="Rangs">Rangs</MenuItem>
            </Select>
          </FormControl>
        )}
        <FormControl fullWidth>
          <InputLabel>Device Type</InputLabel>
          <Select
            type="text"
            name="device_type"
            value={item.device_type || ""}
            onChange={handleChange}
          >
            <MenuItem value="Voice">Voice</MenuItem>
            <MenuItem value="Non Voice">Non Voice</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            fullwide
            label="Insert Date"
            name="insert_date"
            value={item.insert_date ? dayjs(item.insert_date) : dayjs()}
            onChange={(newValue) => {
              handleChange({
                target: {
                  name: "insert_date",
                  value: newValue ? newValue.toISOString() : "",
                },
              });
            }}
          />
        </LocalizationProvider>
      </div>
      <div className="flex w-full justify-end">
        <Button variant="outlined" className="mr-4">
          <Link href="/store">Cancel</Link>
        </Button>
        <Button
          onClick={isUpdate ? updateDevice : saveDevice}
          variant="outlined"
        >
          {isUpdate ? "Update" : "Submit"}
        </Button>
        ;
      </div>
    </div>
  );
};

export default DeviceStoreForm;
