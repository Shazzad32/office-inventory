"use client";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import districtOptions from "@/data";

const DeviceRetailForm = ({ defaultItem, isUpdate }) => {
  const [state, setState] = useState({
    datas: [],
  });

  const router = useRouter();

  const [item, setItem] = useState({
    ...defaultItem,
  });

  const saveDevice = async () => {
    const res = await fetch("/api/retail", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (res.ok) {
      router.push("/retail");
    } else {
      throw new Error("Failed to save data");
    }
  };

  const updateDevice = async () => {
    const res = await fetch(`/api/retail/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      throw new Error("Failed to update topic");
    }
    router.push("/retail");
  };

  useEffect(() => {
    getTechnician();
  }, []);

  const getTechnician = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const data = res.data;
      setState({ datas: data });
    } catch (error) {
      console.error("Error fetching technician data:", error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSwitchChange = (name) => {
    setItem((prevValue) => ({
      ...prevValue,
      [name]: !prevValue[name],
    }));
  };

  const handleAutocompleteChange = (name, newValue) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: newValue,
    }));
  };

  return (
    <div className="w-full flex items-center justify-center p-4 lg:p-6 lg:w-[50%] lg:gap-2 flex-col">
      <div className="w-full h-[95%] flex gap-2 flex-col">
        <TextField
          type="text"
          name="device_id"
          value={item.device_id || ""}
          label="Device Id"
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel>Send To</InputLabel>
          <Select
            type="text"
            name="send_to"
            value={item.send_to || ""}
            onChange={handleChange}
          >
            {state.datas.map((tech, i) => (
              <MenuItem key={i} value={tech.email}>
                {tech.email}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Autocomplete
          fullWidth
          options={districtOptions}
          value={item.district || ""}
          onChange={(e, newValue) =>
            handleAutocompleteChange("district", newValue)
          }
          renderInput={(params) => (
            <TextField {...params} label="District Name" />
          )}
        />
        <TextField
          type="text"
          name="issue_by"
          label="Issue By"
          value={item.issue_by || ""}
          onChange={handleChange}
        />
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
            className="w-[100%]"
            label="Sending Date"
            type="date"
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
        <div className="flex">
          <p className="w-[33%] h-[40px] flex items-center">
            COMPLETE
            {
              <Switch
                value={item.is_complete || ""}
                name="is_complete"
                onChange={() => handleSwitchChange("is_complete")}
                checked={item.is_complete || ""}
              />
            }
          </p>

          {item.is_complete && (
            <div className="flex">
              <TextField
                type="text"
                label="Device Price"
                name="device_price"
                value={item.device_price || ""}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full justify-end gap-4">
        <Button variant="outlined">
          <Link href="/retail">Cancel</Link>
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

export default DeviceRetailForm;
