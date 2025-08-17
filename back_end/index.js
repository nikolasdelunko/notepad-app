import express from "express";

const app = express();

app.use(express.json());

// const notepad = require("./routers/notepad-rout")
import notepad from "./routers/notepad-rout.js";

const port = process.env.PORT || 3000;

app.use("/api", notepad);

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.listen(port, () => console.log(`Server running on port ${port}`));
