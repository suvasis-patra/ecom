import express from "express";

const app = express();

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.listen(8080, () => console.log(`Server started at 8080`));
