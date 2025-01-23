// import { connectToDb } from "@/utils/database";
// import Rangs from "@/models/rangs";
// export const GET = async () => {
//   try {
//     await connectToDb();

//     const data = await Rangs.find();
//     return new Response(JSON.stringify(data), { status: 200 });
//   } catch (error) {
//     return new Response(error.message, { status: 500 });
//   }
// };

// export const POST = async (req) => {
//   let { device_id, from, insert_date, to, issue_by, sending_date } =
//     await req.json();

//   try {
//     await connectToDb();

//     const rangs = new Rangs({
//       device_id,
//       from,
//       to,
//       issue_by,
//       sending_date,
//       insert_date,
//     });

//     await rangs.save();

//     return new Response(JSON.stringify(store), { status: 201 });
//   } catch (error) {
//     return new Response(error.message, { status: 500 });
//   }
// };

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
    const { device_id, from, device_type, send_to, insert_date, device_model } =
      await req.json();

    const newRangsItem = new Rangs({
      device_id,
      from,
      device_model,
      device_type,
      send_to,
      insert_date,
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
