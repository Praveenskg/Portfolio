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

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://portfolio-praveenskg.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE, PATCH",
  allowedHeaders: "Content-Type, Authorization",
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
