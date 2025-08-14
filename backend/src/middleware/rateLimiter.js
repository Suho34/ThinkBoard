import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const userKey = req.ip;
    const { success } = await ratelimit.limit(userKey);
    if (!success) {
      return res.status(429).json({ error: "Too many requests" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(429).json({ error: "Too many requests" });
  }
};

export default rateLimiter;
