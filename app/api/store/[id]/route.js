// import { connectToDb } from "/utils/database";
// import Store from "/models/store";

// export const GET = async (req, { params }) => {
//   let { id } = await params;

//   try {
//     await connectToDb();

//     const newDevice = await Store.findOne({ _id: id });

//     if (newDevice) {
//       return new Response(JSON.stringify(newDevice), { status: 200 });
//     } else {
//       return new Response("Number not found", { status: 404 });
//     }
//   } catch (error) {
//     return new Response(error.message, { status: 500 });
//   }
// };

// export const PUT = async (req, { params }) => {
//   try {
//     let { id } = await params;

//     const { device_id, from, device_type, send_to, insert_date,device_model } =
//       await req.json();

//     const newDevice = await Store.findOne({ _id: id });
//     newDevice.device_id = device_id;
//     newDevice.from = from;
//     newDevice.device_model = device_model;
//     newDevice.device_type = device_type;
//     newDevice.send_to = send_to;
//     newDevice.insert_date = insert_date;

//     await newDevice.save();

//     return new Response("Update successfully", { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return new Response(error.message, { status: 500 });
//   }
// };


// export async function DELETE(request, { params }) {
//   const { id } = params;

//   try {
//     await connectToDb();
//     const deleteItem = await Store.findByIdAndDelete(id);
//     if (!deleteItem) {
//       return NextResponse(error.message, { status: 500 });
//     }
//     return NextResponse.json(
//       { message: "Item deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting item:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }



import { connectToDb } from "/utils/database";
import Store from "/models/store";
import mongoose from "mongoose";

// Helper function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET Method
export const GET = async (req, { params }) => {
  const { id } = params;

  if (!isValidObjectId(id)) {
    return new Response("Invalid ID format", { status: 400 });
  }

  try {
    await connectToDb();
    const device = await Store.findById(id);

    if (device) {
      return new Response(JSON.stringify(device), { status: 200 });
    } else {
      return new Response("Device not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching device:", error);
    return new Response(error.message, { status: 500 });
  }
};

// PUT Method
export const PUT = async (req, { params }) => {
  const { id } = params;

  if (!isValidObjectId(id)) {
    return new Response("Invalid ID format", { status: 400 });
  }

  try {
    const {
      device_id,
      from,
      device_type,
      send_to,
      insert_date,
      device_model,
    } = await req.json();

    await connectToDb();
    const device = await Store.findById(id);

    if (!device) {
      return new Response("Device not found", { status: 404 });
    }
    device.device_id = device_id;
    device.from = from;
    device.device_model = device_model;
    device.device_type = device_type;
    device.send_to = send_to;
    device.insert_date = insert_date;

    await device.save();

    return new Response("Update successful", { status: 200 });
  } catch (error) {
    console.error("Error updating device:", error);
    return new Response(error.message, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = params;

  if (!isValidObjectId(id)) {
    return new Response("Invalid ID format", { status: 400 });
  }

  try {
    await connectToDb();
    const deleteItem = await Store.findByIdAndDelete(id);

    if (!deleteItem) {
      return new Response("Device not found", { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Item deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting item:", error);
    return new Response(error.message, { status: 500 });
  }
};

