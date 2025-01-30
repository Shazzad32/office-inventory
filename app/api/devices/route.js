import { connectToDb } from "@/utils/database";
import Devices from "@/models/devices";

export const GET = async (req) => {
  try {
    await connectToDb();

    const url = new URL(req.url);
    const sendToFilter = url.searchParams.get("send_to");

    const query = sendToFilter ? { send_to: sendToFilter } : {};
    const devices = await Devices.find(query);

    return new Response(JSON.stringify(devices), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    await connectToDb();
    const {
      device_id,
      device_model,
      device_type,
      device_price,
      workshop,
      district,
      from,
      send_to,
      issue_by,
      insert_date,
      sending_date,
      install_date,
      is_complete,
    } = await req.json();

    if (!device_id || !device_model || !device_type || !from) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const existingDevice = await Devices.findOne({ device_id });
    if (existingDevice) {
      return new Response(
        JSON.stringify({
          message: `Device with ID ${device_id} already exists. Ignored.`,
        }),
        { status: 200 }
      );
    }

    const newDevice = new Devices({
      device_id,
      device_model,
      device_type,
      device_price,
      workshop,
      district,
      from,
      send_to,
      issue_by,
      insert_date,
      sending_date,
      install_date,
      is_complete,
    });

    await newDevice.save();

    return new Response(
      JSON.stringify({ message: "Device added successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding device:", error.message);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500 }
    );
  }
};
