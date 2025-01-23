const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const retailSchema = new Schema({
  device_id: { type: String },
  send_to: { type: String },
  from: { type: String },
  district: { type: String },
  device_type: { type: String },
  issue_by: { type: String },
  sending_date: { type: Date },
  install_date: { type: Date, default: Date.now },
  device_price: { type: String },
  is_complete: { type: Boolean, default: false },
  insert_date: { type: Date },
});

retailSchema.index({ device_id: 1 });

retailSchema.pre("save", function (next) {
  if (this.is_complete && !this.install_date) {
    this.install_date = new Date();
  } else if (!this.is_complete) {
    this.install_date = undefined;
  }
  next();
});

module.exports =
  mongoose.models.Retail || mongoose.model("Retail", retailSchema);
