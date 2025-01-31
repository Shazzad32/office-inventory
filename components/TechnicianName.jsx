import React from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

const TechNameName = ({ value, onChange, error, technicians }) => {
  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel>Issue To</InputLabel>
      <Select
        value={value || ""}
        onChange={onChange}
        name="issue_by"
      >
        {technicians.map((tech, i) => (
          <MenuItem key={i} value={tech.tech_name}>
            {tech.tech_name}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default TechNameName;