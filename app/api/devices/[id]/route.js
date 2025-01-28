import { connectToDb } from "/utils/database";
import Devices from "/models/devices";

export const GET = async (req, { params }) => {
  let { id } = await params;

  try {
    await connectToDb();

    const newDevice = await Devices.findOne({ _id: id });

    if (newDevice) {
      return new Response(JSON.stringify(newDevice), { status: 200 });
    } else {
      return new Response("Number not found", { status: 404 });
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
      send_to,
      from,
      district,
      device_type,
      device_model,
      issue_by,
      sending_date,
      install_date,
      device_price,
      is_complete,
      insert_date,
      where,
    } = await req.json();

    const newDevice = await Devices.findOne({ _id: id });
    newDevice.device_id = device_id;
    (newDevice.send_to = send_to),
    (newDevice.district = district),
    (newDevice.device_type = device_type),
    (newDevice.device_model = device_model),
    (newDevice. where =  where);
    (newDevice.issue_by = issue_by),
    (newDevice.sending_date = sending_date),
    (newDevice.install_date = install_date),
    (newDevice.device_price = device_price),
    (newDevice.is_complete = is_complete);
    newDevice.from = from;
    newDevice.insert_date = insert_date;
   

    await newDevice.save();

    return new Response("Update successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
};

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectToDb();
    const deleteItem = await Devices.findByIdAndDelete(id);
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
