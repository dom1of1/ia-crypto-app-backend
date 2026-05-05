import { CryptoAsset } from "../models/CryptoAsset.js";
import { assert } from "../lib/http.js";
import { createCryptoSchema } from "../validators/cryptoSchemas.js";

export async function listAll(_req, res, next) {
  try {
    const assets = await CryptoAsset.find().sort({ name: 1 }).lean();
    res.json({ assets });
  } catch (err) {
    next(err);
  }
}

export async function listGainers(_req, res, next) {
  try {
    const assets = await CryptoAsset.find().sort({ change24h: -1 }).limit(20).lean();
    res.json({ assets });
  } catch (err) {
    next(err);
  }
}

export async function listNew(_req, res, next) {
  try {
    const assets = await CryptoAsset.find().sort({ createdAt: -1 }).limit(20).lean();
    res.json({ assets });
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const payload = createCryptoSchema.parse(req.body);

    const existing = await CryptoAsset.findOne({ symbol: payload.symbol }).lean();
    assert(!existing, 409, "Symbol already exists");

    const created = await CryptoAsset.create(payload);
    res.status(201).json({ asset: created.toObject() });
  } catch (err) {
    next(err);
  }
}

