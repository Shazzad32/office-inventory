import { connectToDb } from "/utils/database";
import Rangs from "@/models/rangs";

export const GET = async (req, { params }) => {
  let { id } = await params;

  try {
    await connectToDb();

    const newDevice = await Rangs.findOne({ _id: id });

    if (newDevice) {
      return new Response(JSON.stringify(newDevice), { status: 200 });
    } else {
      return new Response("Technician not found", { status: 404 });
    }
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  try {
    let { id } = await params;

    const {
      device_id,
      device_model,
      device_type,
      issue_by,
      workshop,
      send_to,
      from,
      insert_date,
      sending_date,
    } = await req.json();

    const newDevice = await Rangs.findOne({ _id: id });
    newDevice.device_id = device_id;
    newDevice.device_model = device_model;
    newDevice.from = from;
    newDevice.workshop = workshop;
    newDevice.device_type = device_type;
    newDevice.send_to = send_to;
    newDevice.issue_by = issue_by;
    newDevice.sending_date = sending_date;
    newDevice.insert_date = insert_date;
    await newDevice.save();

    return new Response("Device add successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
};

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectToDb();
    const deleteItem = await Rangs.findByIdAndDelete(id);
    if (!deleteItem) {
      return NextResponse(error.message, { status: 500 });
    }
    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
