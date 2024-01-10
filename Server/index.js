import "dotenv/config";
import express from "express";
const app = express();
import cors from "cors";
import authRoute from "./router/auth-route.js";
import contactRoute from "./router/contact-route.js";
import connectDb from "./utils/db.js";
import errorMiddleware from "./middleware/error-middleware.js";
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET ,POST ,PUT ,DELETE, PATCH , HEAD",
  Credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

app.use(errorMiddleware);
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Statred at ${PORT}`);
  });
});
