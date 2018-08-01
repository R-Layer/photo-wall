const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const configVars = require("./config/keys");
const userRoutes = require("./routes/userRoutes");
const imageRoutes = require("./routes/imageRoutes");
const port = configVars.PORT;

mongoose
  .connect(
    configVars.MONGODB_URI,
    (() => console.log("Mongodb connected!"), { useNewUrlParser: true })
  )
  .catch(err => {
    console.log("Connection error: ", err);
    process.exit(1);
  });

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/image", imageRoutes);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server running at ${port}`));
