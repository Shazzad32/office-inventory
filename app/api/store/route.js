import { connectToDb } from "@/utils/database";
import Store from "@/models/store";
export const GET = async () => {
  try {
    await connectToDb();

    const data = await Store.find();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const POST = async (req) => {
  let { device_id, from, device_type, send_to, insert_date,device_model } = await req.json();

  try {
    await connectToDb();

    const store = new Store({
      device_id,
      from,
      device_type,
      send_to,
      insert_date,
      device_model,
    });

    await store.save();

    return new Response(JSON.stringify(store), { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
