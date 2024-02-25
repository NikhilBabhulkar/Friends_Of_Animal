import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import eventRoutes from "./routes/events.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
import { checkRole } from "./middleware/CheckRole.js";
import { createEvent } from "./controllers/events.js";
import session  from "express-session"

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use(session({
  secret: "yMw0S9h5FzVmg64fKRdynaQDBvJEJgoj6PhWrTnDcS6UY0NzFNEpNaFHGSxeyCrFv7hAB6iZ/zZkSaR+IKAc3+Dr7TfCHtuC+SbHtD0pj18+", // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

/* FILE STORAGE */
const profilePicsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets/profilepics/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadProfilePics = multer({ storage: profilePicsStorage });

const postsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets/posts/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadPosts = multer({ storage: postsStorage });


const eventPosterStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets/eventposters/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadEventPoster = multer({ storage: eventPosterStorage });

/* ROUTES WITH FILES */
app.post("/auth/register", uploadProfilePics.single("picture"), register);
app.post("/posts", verifyToken, uploadPosts.single("picture"), createPost);
// admin route
app.post("/events/create-event", uploadEventPoster.single("picture"), createEvent);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/events", eventRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`, "And Database Connected"));


    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
