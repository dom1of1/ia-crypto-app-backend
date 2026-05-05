import mongoose from "mongoose";

const cryptoAssetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 1, maxlength: 80 },
    symbol: { type: String, required: true, trim: true, uppercase: true, minlength: 1, maxlength: 12 },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: "" },
    change24h: { type: Number, required: true }
  },
  { timestamps: true }
);

cryptoAssetSchema.index({ createdAt: -1 });
cryptoAssetSchema.index({ change24h: -1 });
cryptoAssetSchema.index({ symbol: 1 }, { unique: true });

export const CryptoAsset =
  mongoose.models.CryptoAsset ?? mongoose.model("CryptoAsset", cryptoAssetSchema);

