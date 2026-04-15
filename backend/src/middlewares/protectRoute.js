import {requireAuth} from '@clerk/express'
import User from '../models/User.js'

export const protectRoute = [
  requireAuth({ signInUrl: "/sign-in" }),
  async (req, res, next) => {
    try {
      const { userId: clerkId, sessionClaims } = req.auth();

      if (!clerkId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // ✅ FIXED EMAIL EXTRACTION
      const email =
        sessionClaims?.email ||
        sessionClaims?.primaryEmailAddress ||
        `${clerkId}@temp.com`;

      const user = await User.findOneAndUpdate(
        { clerkId },
        {
          clerkId,
          email,
          name: sessionClaims?.name || "Temp User",
          profileImage: "",
          role: "candidate"
        },
        { upsert: true, new: true }
      );

      req.user = user;
      next();
    } catch (error) {
      console.error("Error in protectRoute middleware:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
];