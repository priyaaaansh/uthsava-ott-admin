import Redis from "ioredis";
import { config } from "../../../core/config";

export const redis = new Redis(config.redisUrl, {
  lazyConnect: true,
  maxRetriesPerRequest: 1,
  retryStrategy: () => null,
});

redis.on("error", () => {
  // Suppress unhandled redis connection errors when redis is offline in dev
});

export const setCache = async (key: string, value: string, ttl: number) => {
  await redis.set(key, value, "EX", ttl);
};

export const getCache = async (key: string) => {
  return redis.get(key);
};

export const delCache = async (key: string) => {
  await redis.del(key);
};
