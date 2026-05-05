import jwt from "jsonwebtoken";

export function signUserToken({ userId }, secret, { expiresIn = "7d" } = {}) {
  if (!secret) throw new Error("JWT_SECRET is required");
  return jwt.sign({ sub: userId }, secret, { expiresIn });
}

export function verifyUserToken(token, secret) {
  if (!secret) throw new Error("JWT_SECRET is required");
  const payload = jwt.verify(token, secret);
  return payload;
}

