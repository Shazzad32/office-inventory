import { connectToDb } from "@/utils/database";
import Devices from "@/models/devices";

export const GET = async () => {
    try {
      await connectToDb();
  
      const data = await Devices.find({send_to:"Rangs"});
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response(error.message, { status: 500 });
    }
  };