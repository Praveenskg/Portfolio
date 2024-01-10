import "dotenv/config";
import express from "express";
const app = express();
import authRoute from "./router/auth-route.js";
import contactRoute from "./router/contact-route.js";
import connectDb from "./utils/db.js";
import errorMiddleware from "./middleware/error-middleware.js";
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

app.use(errorMiddleware);
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Statred at ${PORT}`);
  });
});
