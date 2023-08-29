const express = require("express");
const mongoose = require("mongoose");
const fileRoutes = require("./routes/fileRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(express.json());

//connect the mongoDb
mongoose
  .connect("mongodb://127.0.0.1:27017/FileSharingApp2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to the db"))
  .catch(() => console.error("Error in connting db"));

app.use("/api/files", fileRoutes);
app.use("/api/auth", authRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server conncted to the ${port}`);
});
