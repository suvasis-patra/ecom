import express from "express";
import path from "path";

import { clerkMiddleware } from "@clerk/express";

import config from "./config/env.js";
import connectDB from "./config/db.js";

const app = express();

const _dirname = path.resolve();

app.use(clerkMiddleware()); // adds auth to request object

app.get("/api/health", (_, res) => {
  res.status(200).json({ message: "success" });
});

if (config.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "../admin/dist")));

  app.get("{/*any}", (_, res) => {
    res.sendFile(path.join(_dirname, "../admin", "/dist", "index.html"));
  });
}

app.listen(config.PORT, () => {
  connectDB().then(() => console.log(`Server started at ${config.PORT}`));
});
