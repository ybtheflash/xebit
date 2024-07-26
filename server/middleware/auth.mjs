import jwt from "jsonwebtoken";
import { getAppwriteConfig } from "../../lib/appwrite.mjs";

const auth = async (req, res, next) => {
  const { databases, DATABASE_ID, USERS_COLLECTION_ID } = getAppwriteConfig();

  // Get token from header
  const authHeader = req.header("Authorization");

  const token = authHeader?.replace("Bearer ", "");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists in Appwrite
    try {
      const user = await databases.getDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        decoded.userId
      );

      if (!user) {
        return res.status(401).json({ msg: "Token is not valid" });
      }

      // Add full user object to request
      req.user = user;
      next();
    } catch (error) {
      console.error("Error fetching user from Appwrite:", error);
      return res.status(401).json({ msg: "Token is not valid" });
    }
  } catch (err) {
    console.error("Error verifying token:", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;
