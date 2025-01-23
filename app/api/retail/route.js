// import { connectToDb } from "@/utils/database";
// import Retail from "@/models/retail";
// export const GET = async () => {
//   try {
//     await connectToDb();

//     const data = await Retail.find();
//     return new Response(JSON.stringify(data), { status: 200 });
//   } catch (error) {
//     return new Response(error.message, { status: 500 });
//   }
// };

// export const POST = async (req) => {
//   let {
//     device_id,
//     send_to,
//     district,
//     issue_by,
//     sending_date,
//     install_date,
//     device_price,
//     device_type,
//     is_complete,
//     from,
//     insert_date,
//   } = await req.json();

//   try {
//     await connectToDb();

//     const retail = new Retail({
//       device_id,
//       send_to,
//       district,
//       issue_by,
//       sending_date,
//       install_date,
//       device_price,
//       device_type,
//       is_complete,
//       from,
//       insert_date,
//     });

//     await retail.save();

//     return new Response(JSON.stringify(retail), { status: 201 });
//   } catch (error) {
//     return new Response(error.message, { status: 500 });
//   }
// };

import { connectToDb } from "/utils/database";
import Retail from "/models/retail";

export const GET = async () => {
  try {
    await connectToDb();

    const data = await Retail.find();
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

    const newRetailItem = new Retail({
      device_id,
      from,
      device_model,
      device_type,
      send_to,
      insert_date,
    });

    await newRetailItem.save();

    return new Response("Product transferred to retail successfully", {
      status: 201,
    });
  } catch (error) {
    console.error("Error transferring to retail:", error);
    return new Response(error.message, { status: 500 });
  }
};
