const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const devicesSchema = new Schema({
  device_id: { type: String },
  device_model: { type: String },
  device_type: { type: String },
  from: { type: String },
  send_to: { type: String, enum: ["Store", "Rangs", "Retail"], required: true },
  issue_by: { type: String },
  where: { type: String, default: "Office" },
  workshop: { type: String },
  district: { type: String },
  device_price: { type: String },
  insert_date: { type: Date, default: Date.now },
  sending_date: { type: Date },
  install_date: { type: Date, default: Date.now },
  is_complete: { type: Boolean, default: false },
  is_send: { type: Boolean, default: false },
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

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const devicesSchema = new Schema({
//   device_id: { type: String, required: true },
//   device_model: { type: String },
//   device_type: { type: String },
//   from: { type: String },
//   send_to: { type: String }, //, enum: ["Store", "Rangs", "Retail"], required: true
//   issue_by: { type: String },
//   insert_date: { type: Date, default: Date.now },
//   sending_date: { type: Date },
//   install_date: { type: Date },
//   is_complete: { type: Boolean, default: false },
//   is_send: { type: Boolean, default: false },
// });

// devicesSchema.index({ device_id: 1 }); // Ensure device_id is unique for querying

// module.exports =
//   mongoose.models.Devices || mongoose.model("Devices", devicesSchema);
