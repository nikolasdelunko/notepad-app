import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// const notepad = require("./routers/notepad-rout")
import notepad from "./routers/notepad-rout.js";

const port = process.env.PORT || 5000;

app.use("/api", notepad);

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.listen(port, () => console.log(`Server running on port ${port}`));
