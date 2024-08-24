const app = require('./app')
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });


const DB = process.env.DATABASE.replace("<db_password>", process.env.PASSWORD);

// DB CONNECTION
mongoose.connect(DB).then(() => {
  console.log("DB connected successfully!");
}).catch((err) => {
  console.error("DB connection error:", err); // Error handling
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
