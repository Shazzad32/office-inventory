const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rangsSchema = new Schema({
  device_id: { type: String },
  device_model: { type: String },
  device_type: { type: String },
  from: { type: String },
  workshop: { type: String },
  send_to: { type: String },
  issue_by: { type: String },
  sending_date: { type: Date },
  insert_date: { type: Date },
  is_send: { type: Boolean, default: false },
});

rangsSchema.index({ device_id: 1 });

module.exports = mongoose.models.Rangs || mongoose.model("Rangs", rangsSchema);
