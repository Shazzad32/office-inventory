const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rangsSchema = new Schema({
  device_id: { type: String },
  from: { type: String },
  send_to: { type: String },
  issue_by: { String },
  device_type: { String },
  sending_date: { type: Date },
  insert_date: { type: Date },
});

rangsSchema.index({ device_id: 1 });

module.exports = mongoose.models.Rangs || mongoose.model("Rangs", rangsSchema);
