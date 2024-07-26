import express from "express";
import auth from "../middleware/auth.mjs";
import { getAppwriteConfig } from "../../lib/appwrite.mjs";
import { Query } from "node-appwrite";
import { sendEmail } from "../../lib/emailService.mjs";
import crypto from "crypto";
const router = express.Router();
// Store OTPs in memory (consider using a database for production)
const otpStore = new Map();

router.post("/send-otp", auth, async (req, res) => {
  const { databases, DATABASE_ID, USERS_COLLECTION_ID } = getAppwriteConfig();
  try {
    const email = req.user.email;

    if (!email) {
      console.error("User email not found in request");
      return res.status(400).json({ message: "User email not found" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 });

    // console.log(`OTP for ${email}: ${otp}`);

    await sendEmail(email, "Email Verification OTP", `Your OTP is: ${otp}`);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

router.post("/verify-otp", auth, async (req, res) => {
  const { databases, DATABASE_ID, USERS_COLLECTION_ID } = getAppwriteConfig();
  try {
    const { otp } = req.body;
    const email = req.user.email;
    // console.log(`Verifying OTP for ${email}: ${otp}`);
    // console.log("Database ID:", DATABASE_ID);
    // console.log("Users Collection ID:", USERS_COLLECTION_ID);
    // console.log("User ID:", req.user.$id);

    const storedOtpData = otpStore.get(email);
    // console.log("Stored OTP data:", storedOtpData);

    if (!storedOtpData) {
      return res
        .status(400)
        .json({ message: "No OTP found for this email, Send OTP Again" });
    }

    if (Date.now() > storedOtpData.expires) {
      otpStore.delete(email);
      return res.status(400).json({ message: "OTP has expired" });
    }

    if (storedOtpData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Update user's email_verified status in Appwrite
    const result = await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      req.user.$id,
      {
        email_verified: true,
      }
    );

    // console.log("Update result:", result);

    otpStore.delete(email);
    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    res
      .status(500)
      .json({ message: "Failed to verify OTP", error: error.message });
  }
});

// Get user profile
router.get("/profile", auth, async (req, res) => {
  const { databases, DATABASE_ID, USERS_COLLECTION_ID } = getAppwriteConfig();
  // console.log("Get profile - Appwrite config:", {
  //   DATABASE_ID,
  //   USERS_COLLECTION_ID,
  // });

  try {
    const user = await databases.getDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      req.user.$id
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    delete user.password;
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Update user profile
router.put("/profile", auth, async (req, res) => {
  const { databases, DATABASE_ID, USERS_COLLECTION_ID } = getAppwriteConfig();

  try {
    const {
      realname,
      username,
      email,
      role,
      userTags,
      userSocials,
      alias,
      profileLink,
      biodata,
      avatarURL,
    } = req.body;

    let updateData = {};
    if (realname) updateData.realname = realname;
    if (role) updateData.role = role;
    if (userTags) updateData.userTags = userTags;
    if (userSocials) updateData.userSocials = userSocials;
    if (alias) updateData.alias = alias;
    if (profileLink) updateData.profileLink = profileLink;
    if (biodata) updateData.biodata = biodata;
    if (avatarURL) updateData.avatarURL = avatarURL;

    // Check if username is being changed and if it's already taken
    if (username && username !== req.user.username) {
      const existingUsers = await databases.listDocuments(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        [Query.equal("username", username)]
      );
      if (existingUsers.documents.length > 0) {
        return res.status(400).json({ message: "Username already taken" });
      }
      updateData.username = username;
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== req.user.email) {
      const existingUsers = await databases.listDocuments(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        [Query.equal("email", email)]
      );
      if (existingUsers.documents.length > 0) {
        return res.status(400).json({ message: "Email already in use" });
      }
      updateData.email = email;
      updateData.email_verified = false; // Reset email verification status
    }

    const updatedUser = await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      req.user.$id,
      updateData
    );

    // Remove password from the response
    delete updatedUser.password;

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete user account
router.delete("/profile", auth, async (req, res) => {
  const { databases, DATABASE_ID, USERS_COLLECTION_ID } = getAppwriteConfig();
  // console.log("Delete profile - Appwrite config:", {
  //   DATABASE_ID,
  //   USERS_COLLECTION_ID,
  // });

  try {
    await databases.deleteDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      req.user.$id
    );
    res.json({ message: "User account deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
