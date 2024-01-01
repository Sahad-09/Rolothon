// const mongoose = require("mongoose");

// const db = async () => {
//   try {
//     mongoose.set("strictQuery", false);
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("Db Connected");
//   } catch (error) {
//     console.log("DB Connection Error");
//     console.log(error);
//   }
// };

// module.exports = { db };
const mongoose = require("mongoose");

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Other options...
    });
    console.log("Db Connected");
  } catch (error) {
    console.log("DB Connection Error");
    console.error(error);
  }
};

module.exports = { db };
