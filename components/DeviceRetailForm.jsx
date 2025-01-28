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
import React, { useState } from "react";
import dayjs from "dayjs";
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
    const res = await fetch("/api/devices", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (res.ok) {
      router.push("/retail");
    } else {
      const responseData = await res.json();
      if (
        responseData.error &&
        responseData.error.includes("Device with this ID already exists")
      ) {
        alert(`Device with ID: ${item.device_id} already exists!`);
      } else {
        throw new Error(responseData.error || "Failed to save data");
      }
    }
  };

  // const updateDevice = async () => {
  //   const res = await fetch(`/api/devices/${item._id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(item),
  //   });

  //   if (!res.ok) {
  //     throw new Error("Failed to update topic");
  //   }
  //   router.push("/retail");
  // };

  // useEffect(() => {
  //   getTechnician();
  // }, []);

  // const getTechnician = async () => {
  //   try {
  //     const res = await axios.get(
  //       "https://jsonplaceholder.typicode.com/comments"
  //     );
  //     const data = res.data;
  //     setState({ datas: data });
  //   } catch (error) {
  //     console.error("Error fetching technician data:", error.message);
  //   }
  // };

  const updateDevice = async () => {

    const res = await fetch(`/api/devices/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      throw new Error("Failed to update device");
    }

    router.push("/retail");
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
    setItem((prevUser) => ({
      ...prevUser,
      [name]: newValue,
    }));
  };

  return (
    <div className="w-full flex items-center justify-center p-4 lg:p-6 lg:w-[50%] lg:gap-2 flex-col">
      <div className="w-full h-[100%] lg:h-[90%] flex gap-2 flex-col">
        <TextField
          type="text"
          name="device_id"
          value={item.device_id || ""}
          label="Device Id"
          onChange={handleChange}
        />
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
        <TextField
          type="text"
          name="where"
          value={item.where || ""}
          label="Where"
          onChange={handleChange}
        />
        {/* <FormControl fullWidth>
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
        </FormControl> */}

        {isUpdate && (
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
        )}

        {isUpdate && <TextField
          type="text"
          name="issue_by"
          label="Issue By"
          value={item.issue_by || ""}
          onChange={handleChange}
        />}
        
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

        {isUpdate && <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        </LocalizationProvider>}
        <div className="flex">
          <p className="lg:w-[25%] w-[40%] h-[40px] flex items-center">
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
