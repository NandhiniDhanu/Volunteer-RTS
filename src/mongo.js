import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });

const newSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  terms: {
    type: Boolean,
    required: true,
  },
  roles: {
    type: [Number], // Array of role IDs
    default: [2001], // Default role is 'User'
  },
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, 
  },
  createdBy: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true
  }
});

const collection = mongoose.model("collection", newSchema);
const Post = mongoose.model("Post", postSchema);

export { collection, Post };
