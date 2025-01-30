"use client";
import {
  Autocomplete,
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
import districtOptions from "@/data";

const DeviceStoreForm = ({ defaultItem, isUpdate }) => {
  const router = useRouter();
  const [item, setItem] = useState({
    ...defaultItem,
  });

  const [errors, setErrors] = useState({
    issue_by: "",
    district: "",
  });

  const validateFields = () => {
    let newErrors = { issue_by: "", district: "" };

    if (!item.issue_by) {
      newErrors.issue_by = "Issue By is required";
    }

    if (!item.district) {
      newErrors.district = "District Name is required";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const saveDevice = async () => {
    try {
      const res = await fetch("/api/devices", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(item),
      });

      const { message, error } = await res.json();
      alert(res.ok ? message : error || "Failed to save data");
      if (res.ok) router.push("/store");
    } catch (err) {
      console.error("Error saving device:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const updateDevice = async () => {
    if (!validateFields()) return;

    const res = await fetch(`/api/devices/${item._id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      throw new Error("Failed to update device");
    }

    router.push("/store");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (name, newValue) => {
    setItem((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
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
          disabled={isUpdate}
        />

        {!isUpdate && (
          <>
            <TextField
              type="text"
              name="device_model"
              value={item.device_model || ""}
              label="Device Model"
              onChange={handleChange}
            />
            <TextField
              type="text"
              name="from"
              value={item.from || ""}
              label="From"
              onChange={handleChange}
            />
          </>
        )}
        <FormControl fullWidth>
          <InputLabel>Device Type</InputLabel>
          <Select
            type="text"
            name="device_type"
            value={item.device_type || ""}
            onChange={handleChange}
            disabled={isUpdate}
          >
            <MenuItem value="Voice">Voice</MenuItem>
            <MenuItem value="Non_Voice">Non_Voice</MenuItem>
          </Select>
        </FormControl>

        {/* Send To (Only Show in Update Mode) */}
        {isUpdate && (
          <FormControl fullWidth>
            <InputLabel>Send To</InputLabel>
            <Select
              type="text"
              name="send_to"
              value={item.send_to || ""}
              onChange={handleChange}
            >
              <MenuItem value="Retail">Retail</MenuItem>
              <MenuItem value="Rangs">Rangs</MenuItem>
            </Select>
          </FormControl>
        )}
        {isUpdate && item.send_to === "Retail" && (
          <div className="w-full flex gap-2">
            <TextField
              className="w-[50%]"
              type="text"
              name="issue_by"
              value={item.issue_by || ""}
              label="Issue To"
              onChange={handleChange}
              error={!!errors.issue_by}
              helperText={errors.issue_by}
            />
            <Autocomplete
              className="w-[50%]"
              options={districtOptions}
              value={item.district || ""}
              onChange={(e, newValue) =>
                handleAutocompleteChange("district", newValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="District Name"
                  error={!!errors.district}
                  helperText={errors.district}
                />
              )}
            />
          </div>
        )}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            fullwidth
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
      <div className="flex w-full justify-end gap-2">
        <Button variant="outlined">
          <Link href="/store">Cancel</Link>
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

export default DeviceStoreForm;
