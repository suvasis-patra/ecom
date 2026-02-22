import { Inngest } from "inngest";

import connectDB from "./db.js";
import { User } from "../models/user.model.js";

export const inngest = new Inngest({ id: "ecom-app" });

const createUserInDB = inngest.createFunction(
  { id: "createUserInDB" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      await connectDB();
      const { id, email_addresses, first_name, last_name, image_url } =
        event.data;
      const newUser = {
        firstName: first_name || "",
        lastName: last_name || "",
        email: email_addresses[0]?.email_address,
        imageUrl: image_url,
        clerkId: id,
        wishList: [],
        addresses: [],
      };
      await User.create(newUser);
      console.log("New user created");
    } catch (error) {
      console.log("Failed to create new user", error);
    }
  },
);

const deleteUserFromDB = inngest.createFunction(
  { id: "deleteUserFromDB" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });
  },
);

export const functions = [createUserInDB, deleteUserFromDB];
