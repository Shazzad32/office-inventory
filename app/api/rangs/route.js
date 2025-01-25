import { connectToDb } from "/utils/database";
import Rangs from "/models/rangs"; // Ensure this is the correct model

export const GET = async () => {
  try {
    await connectToDb();

    const data = await Rangs.find();
    return new Response(JSON.stringify(data), { status: 200 });
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
      issue_by,
      send_to,
      from,
      insert_date,
      sending_date,
      Workshop,
    } = await req.json();

    const newRangsItem = new Rangs({
      device_id,
      device_model,
      device_type,
      issue_by,
      Workshop,
      send_to,
      from,
      insert_date,
      sending_date,
    });

    await newRangsItem.save();

    return new Response("Product transferred to rangs successfully", {
      status: 201,
    });
  } catch (error) {
    console.error("Error transferring to rangs:", error);
    return new Response(error.message, { status: 500 });
  }
};
