const express = require("express");
const authApp = require("./routes/auth");

const app = express();

app.use("/", authApp);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
