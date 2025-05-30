import path from "path"

import express from "express" ;
import dotenv from "dotenv" ;
import morgan from "morgan";

dotenv.config({ path: "config.env" });
import dbConnection from "./config/database.js";

// routing

import { mountRouting } from "./routes/index.js";

//database connection
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// routing
mountRouting(app)

// listen port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
