const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const devicesSchema = new Schema({
  device_id: { type: String },
  device_model: { type: String },
  device_type: { type: String,enum: ["Voice", "Non_Voice"] },
  from: { type: String },
  send_to: { type: String, enum: ["Retail", "Rangs", "Store"], default:"Store" },
  issue_by: { type: String },
  workshop: { type: String },
  district: { type: String },
  device_price: { type: Number },
  insert_date: { type: Date, default: Date.now },
  install_date: { type: Date, default: Date.now },
  sending_date: { type: Date },
  is_complete: { type: Boolean, default: false },
});

devicesSchema.index({ device_id: 1 });

devicesSchema.pre("save", function (next) {
  if (this.is_complete && !this.install_date) {
    this.install_date = new Date();
  } else if (!this.is_complete) {
    this.install_date = undefined;
  }
  next();
});

module.exports =
  mongoose.models.Devices || mongoose.model("Devices", devicesSchema);