import "dotenv/config";
import express from "express";
const app = express();
import cors from "cors";
import authRoute from "./router/auth-router.js";
import contactRoute from "./router/contact-router.js";
import adminRoute from "./router/admin-router.js";
import connectDb from "./utils/db.js";
import errorMiddleware from "./middleware/error-middleware.js";
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://portfolio-back-iota.vercel.app/",
    ];
    const isAllowed = allowedOrigins.includes(origin);
    callback(null, isAllowed ? origin : false);
  },
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/admin", adminRoute, contactRoute);

app.use(errorMiddleware);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
  });
});
