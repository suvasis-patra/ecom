import express from "express";
import path from "path";

import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";

import config from "./config/env.js";
import connectDB from "./config/db.js";
import { functions, inngest } from "./config/inngest.js";

const app = express();

const _dirname = path.resolve();

app.use(express.json());
app.use(clerkMiddleware()); // adds auth to request object

app.use("/api/inngest", serve({ client: inngest, functions: functions }));

app.get("/api/health", (_, res) => {
  res.status(200).json({ message: "success" });
});

if (config.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "../admin/dist")));

  app.get("{/*any}", (_, res) => {
    res.sendFile(path.join(_dirname, "../admin", "/dist", "index.html"));
  });
}

const startServer = async () => {
  await connectDB();
  app.listen(config.PORT, () => {
    console.log(`Server started at ${config.PORT}`);
  });
};

startServer();
