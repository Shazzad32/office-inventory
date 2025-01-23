"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

const TransferProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [targetCollection, setTargetCollection] = useState("");
  const [imei, setImei] = useState("");

  // Fetch products from the store collection
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/store"); // Endpoint to get store products
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle form submission
  const handleTransfer = async () => {
    if (!selectedProduct || !products.device_id) {
      alert("Please select a product and a target collection");
      return;
    }

    try {
      const response = await axios.post("/api/store", {
        imei,
        targetCollection,
      });

      alert(response.data.message);
      setImei("");
      setSelectedProduct("");
      setTargetCollection("");
    } catch (error) {
      console.error("Error transferring product:", error);
      alert("Failed to transfer product");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h3>Transfer Product</h3>
      <TextField
        fullWidth
        select
        label="Select Product"
        value={selectedProduct}
        onChange={(e) => {
          setSelectedProduct(e.target.value);
          setImei(
            products.find((p) => p.name === e.target.value)?.device_id || ""
          );
        }}
        margin="normal"
      >
        {products.map((product) => (
          <MenuItem key={product.device_id} value={product.name}>
            {product.name}
          </MenuItem>
        ))}
      </TextField>

      <FormControl fullWidth margin="normal">
        <InputLabel>Send To</InputLabel>
        <Select
          value={targetCollection}
          onChange={(e) => setTargetCollection(e.target.value)}
        >
          <MenuItem value="retail">Retail</MenuItem>
          <MenuItem value="rangs">Rangs</MenuItem>
        </Select>
      </FormControl>

      <TextField fullWidth label="IMEI" value={imei} margin="normal" disabled />

      <Button
        variant="contained"
        color="primary"
        onClick={handleTransfer}
        style={{ marginTop: "20px" }}
        fullWidth
      >
        Transfer
      </Button>
    </div>
  );
};

export default TransferProduct;
