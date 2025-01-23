import React from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const ImportFile = () => {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      for (const row of jsonData) {
        // Check for blank insert_date and replace it with the current date
        if (!row.insert_date || row.insert_date === "undefined") {
          row.insert_date = new Date().toISOString(); // Current date in ISO format
        }

        try {
          const response = await axios.post("/api/store", row, {
            headers: { "Content-Type": "application/json" },
          });

          if (response.status === 201) {
            console.log("Row saved successfully:", row);
          }
        } catch (error) {
          console.error("Error saving row:", row, error);
        }
      }
      alert("Data import completed!");
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <label className="border-2 h-[30px] lg:p-4 rounded-md flex items-center justify-center text-white cursor-pointer">
        <span className="lg:flex hidden">Import Excel</span>
        <InsertDriveFileIcon className="flex lg:hidden h-[15px] w-[20px]" />
        <input
          type="file"
          className="hidden"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
};

export default ImportFile;
