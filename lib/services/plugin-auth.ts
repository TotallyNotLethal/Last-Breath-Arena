import { createHmac, timingSafeEqual } from "crypto";

export function verifyPluginSignature(rawBody: string, signature: string) {
  const secret = process.env.PLUGIN_API_SHARED_SECRET;
  if (!secret) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
