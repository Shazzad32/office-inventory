const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  device_id: { type: String },
  device_model: { type: String },
  from: { type: String },
  device_type: { type: String },
  send_to: { type: String },
  insert_date: { type: Date, default: Date.now },
  sending_date: { type: Date },
});

storeSchema.index({ device_id: 1 });

module.exports = mongoose.models.Store || mongoose.model("Store", storeSchema);
