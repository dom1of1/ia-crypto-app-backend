import { User } from "../models/User.js";
import { assert } from "../lib/http.js";
import { signUserToken } from "../services/jwtService.js";
import { hashPassword, verifyPassword } from "../services/passwordService.js";
import { loginSchema, registerSchema } from "../validators/authSchemas.js";

function cookieOptions(req) {
  const isProd = req.app.get("env") === "production";
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000
  };
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    const existing = await User.findOne({ email }).lean();
    assert(!existing, 409, "Email already in use");

    const passwordHash = await hashPassword(password);
    const user = await User.create({ name, email, passwordHash });

    const token = signUserToken({ userId: user._id }, req.app.get("jwtSecret"));
    res.cookie("token", token, cookieOptions(req));
    res.status(201).json({ user: user.toSafeJSON() });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });
    assert(user, 401, "Invalid email or password");

    const ok = await verifyPassword(password, user.passwordHash);
    assert(ok, 401, "Invalid email or password");

    const token = signUserToken({ userId: user._id }, req.app.get("jwtSecret"));
    res.cookie("token", token, cookieOptions(req));
    res.json({ user: user.toSafeJSON() });
  } catch (err) {
    next(err);
  }
}

export async function logout(_req, res, next) {
  try {
    res.clearCookie("token", { path: "/" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

