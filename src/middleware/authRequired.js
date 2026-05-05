import { HttpError } from "../lib/http.js";
import { verifyUserToken } from "../services/jwtService.js";

export function authRequired(req, _res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) throw new HttpError(401, "Not authenticated");

    const payload = verifyUserToken(token, req.app.get("jwtSecret"));
    req.auth = { userId: payload.sub };
    next();
  } catch (err) {
    next(err instanceof HttpError ? err : new HttpError(401, "Not authenticated"));
  }
}

