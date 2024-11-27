import express from "express";
import { collection, Post } from "./mongo.js"; // Import both schemas
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Register User
app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, marketingEmails, terms } = req.body;
  try {
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new collection({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      terms,
      roles: [2001], // Default to "User"
    });

    await newUser.save();
    res.status(201).json({ message: "User signed up successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error signing up", error: err.message });
  }
});

// Login User
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        email: user.email,
        roles: user.roles,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error during login", error: err.message });
  }
});

// Fetch All Posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); // Sort by most recent
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
});
const generateUniqueId = async () => {
    let uniqueId;
    let isUnique = false;
  
    while (!isUnique) {
      uniqueId = Math.floor(1000 + Math.random() * 9000); // Generate random 4-digit number
      const existingPost = await Post.findOne({ id: uniqueId });
      if (!existingPost) {
        isUnique = true; // Ensure the ID is unique
      }
    }
    return uniqueId;
  };
// Add a New Post (Admin Only)
app.post("/posts", async (req, res) => {
  const { title, description, createdBy } = req.body;
  try {
    // Check if the user is an admin
    const user = await collection.findOne({ email: createdBy });
    if (!user || !user.roles.includes(5150)) {
      return res.status(403).json({ message: "Unauthorized. Only admins can add posts." });
    }

    const uniqueId = await generateUniqueId();

    const newPost = new Post({
        title,
        description,
        createdBy,
        id: uniqueId, // Assign the unique ID
      });

    await newPost.save();
    res.status(201).json({ message: "Post added successfully", post: newPost });
  } catch (err) {
    res.status(500).json({ message: "Error adding post", error: err.message });
  }
});
// Fetch all users
app.get("/admin_dashboard", async (req, res) => {
  try {
    // Fetch users who do not have the admin role (5150)
    const users = await collection.find(
      { roles: { $ne: 5150 } }, // Exclude users with role ID 5150
      { password: 0 } // Exclude the password field
    );
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

app.listen(8000, () => console.log("Server running on http://localhost:8000"));

