import bodyParser from "body-parser";
import express from "express";
import productsRouter from "./routers/productsRouter.js";
import usersRouter from "./routers/usersRouter.js";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const DB_CONNECTION_STRING = "mongodb+srv://Kyliechisholm:Moonpower1!@mernshop.auwxm.mongodb.net/?retryWrites=true&w=majority&appName=mernShop";
app.use(
  cors({
    origin: process.env.UI_URL,
  })
);

app.use(bodyParser.json());

app.use("/uploads/images", express.static(`${process.cwd()}/uploads/images`))

app.use("/products", productsRouter);

app.use("/users", usersRouter);

mongoose.connect(DB_CONNECTION_STRING)
  .then(() => {

    console.log("Successfully connected to the db.");
    const port = process.env.PORT ?? 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((e) =>
    console.error(`Unable to connect to the database with error: ${e}`)
  );
