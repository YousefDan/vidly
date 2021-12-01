const mongoose = require("mongoose");

async function connectToMongodb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To MongoDB");
  } catch (error) {
    console.log("Connection Failed To DB", error);
  }
}
module.exports = connectToMongodb;
