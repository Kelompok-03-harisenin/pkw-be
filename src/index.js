const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");

const app = express();

const authRouter = require("./routes/auth.route")
const photoRouter = require("./routes/photo.route")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRouter)
app.use("/api/photos", photoRouter)


app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log("Server Running");
});
