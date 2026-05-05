import { z } from "zod";

export const createCryptoSchema = z.object({
  name: z.string().trim().min(1).max(80),
  symbol: z
    .string()
    .trim()
    .min(1)
    .max(12)
    .transform((v) => v.toUpperCase()),
  price: z.number().finite().min(0),
  image: z.string().trim().url().optional(),
  change24h: z.number().finite()
});

