import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getAppwriteConfig } from "../../lib/appwrite.mjs";
import { ID, Query } from "node-appwrite";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { databases, DATABASE_ID, USERS_COLLECTION_ID } = getAppwriteConfig();

  try {
    const { username, email, password, registeredOn } = req.body;

    // Check if username already exists
    const existingUsername = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal("username", username)]
    );

    if (existingUsername.documents.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if email already exists
    const existingEmail = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal("email", email)]
    );

    if (existingEmail.documents.length > 0) {
      return res.status(400).json({ message: "E-mail already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      {
        username,
        email,
        password: hashedPassword,
        registeredOn,
      }
    );

    // Create and return JWT token
    const payload = {
      user: {
        id: user.$id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { databases, DATABASE_ID, USERS_COLLECTION_ID } = getAppwriteConfig();
  // console.log("Login route - Appwrite config:", {
  //   DATABASE_ID,
  //   USERS_COLLECTION_ID,
  // });

  try {
    const { username, password } = req.body;

    // Check if user exists
    const users = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal("username", username)]
    );

    if (users.documents.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = users.documents[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and return JWT token
    const payload = {
      user: {
        id: user.$id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/verify-secret-key", (req, res) => {
  const { secretKey } = req.body;
  if (secretKey === process.env.REGISTER_SECRET_KEY) {
    res.json({ message: "Secret key verified" });
  } else {
    res.status(400).json({ message: "Invalid secret key" });
  }
});

export default router;
