import { User } from "../models/User.js";
import { HttpError } from "../lib/http.js";

export async function getProfile(req, res, next) {
  try {
    const userId = req.auth?.userId;
    if (!userId) throw new HttpError(401, "Not authenticated");

    const user = await User.findById(userId);
    if (!user) throw new HttpError(401, "Not authenticated");

    res.json({ user: user.toSafeJSON() });
  } catch (err) {
    next(err);
  }
}

