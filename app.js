import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import usersRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/product", productRouter);

app.get("/", (req, res) => {
  res.send("App is Working Fine");
});

app.use(errorMiddleware);
