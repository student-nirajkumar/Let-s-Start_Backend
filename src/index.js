import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({ path: ".env" });

const app = express();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is running at port : ${process.env.PORT || 8000}`
      );
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed", err);
  });






// // First Aproach
// import express from "express";
// const app = express();

// (async () => {
//     try {
//         await mongoose.connect(
//             `${process.env.MONGODB_URI}/${DB_NAME}`
//         );

//         app.on("error", (error) => {
//             console.log("App Error:", error);
//             throw error;
//         });

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         });

//         console.log("MongoDB connected successfully");
//     } catch (error) {
//         console.error("Error:", error);
//         throw error;
//     }
// })();
