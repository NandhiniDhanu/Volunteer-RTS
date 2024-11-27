import express from "express";
import collection from "./mongo.js"; 
import cors from "cors"; 
import bcrypt from "bcrypt";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

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
          roles: [2001] 
      });

      await newUser.save();
      res.status(201).json({ message: "User signed up successfully" });
  } catch (err) {
      res.status(500).json({ message: "Error signing up", error: err.message });
  }
});


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

      // Send roles along with the user data
      res.status(200).json({ 
          message: "Login successful", 
          user: {
              email: user.email,
              roles: user.roles, 
              firstName: user.firstName,
              lastName: user.lastName
          } 
      });
  } catch (err) {
      res.status(500).json({ message: "Error during login", error: err.message });
  }
});
app.get("/admin_dashboard", async (req, res) => {
    try {
      const users = await collection.find({ roles: 2001 }); 
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Error fetching users", error: err.message });
    }
  });
  

app.listen(8000, () => console.log("Server running on http://localhost:8000"));
