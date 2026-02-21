import express from "express";
import path from "path";
import config from "./config/env.js";

const app = express();

const _dirname = path.resolve();

app.get("/api/health", (_, res) => {
  res.status(200).json({ message: "success" });
});

if (config.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "../admin/dist")));

  app.get("{/*any}", (_, res) => {
    res.sendFile(path.join(_dirname, "../admin", "/dist", "index.html"));
  });
}

app.listen(config.PORT, () => console.log(`Server started at ${config.PORT}`));
