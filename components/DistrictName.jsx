import React from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

const DistrictName = ({ value, onChange, error, technicians }) => {
  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel>District</InputLabel>
      <Select
        value={value || ""}
        onChange={onChange}
        name="district"
      >
        {technicians.map((tech, i) => (
          <MenuItem key={i} value={tech.district}>
            {tech.district}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default DistrictName;